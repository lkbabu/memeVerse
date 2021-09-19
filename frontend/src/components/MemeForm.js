import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { useForm } from "../util/hooks";
import { FETCH_POSTS_QUERY } from "../util/Query";

function MemeForm() {
  const [imageFile, setImage] = useState("");
  const [url, setUrl] = useState("");

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
    image: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: {
      body: values.body,
      image: url,
    },
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
  const handleImageUpload = async () => {
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "USEYOURPRESET");
    data.append("cloud_name", "CLOUDNAME");

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/CLOUDNAME/image/upload`,
      data
    );

    setUrl(res.data.url);
  };
  const onFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  async function createPostCallback() {
    await handleImageUpload();
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>

        <Form.Field>
          <div>
            <input type="file" onChange={onFileChange} />
          </div>
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
      image
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
