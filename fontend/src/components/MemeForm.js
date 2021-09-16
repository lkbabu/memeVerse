import React from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { useForm } from "../util/hooks";
import { FETCH_POSTS_QUERY } from "../util/Query";

function MemeForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
    image: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      let newData = [...data.getPosts];
      newData = [result.data.createPost, ...newData];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: {
            newData,
          },
        },
      });
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>

        <Form.Field>
          <Button as="label" htmlFor="file" type="button">
            Upload Image
          </Button>
          <input type="file" id="file" hidden />
        </Form.Field>

        <Form.Field>
          <Form.Input
            placeholder="Add Caption"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="green">
            Submit
          </Button>
        </Form.Field>
      </Form>
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!, $image: String!) {
    createPost(body: $body, image: $image) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default MemeForm;
