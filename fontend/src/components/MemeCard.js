import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../util/authorization";

import LikeButton from "./LikeButton";

const MemeCard = ({ post }) => {
  const {
    body,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    likes,
    image,
  } = post;
  const { user } = useContext(AuthContext);

  const commentOnPost = () => {};
  return (
    <Card>
      <Image src={image} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          <span className="date">{moment(createdAt).fromNow()}</span>
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra textAlign="center">
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Button
          color="blue"
          icon="comment"
          content="comment"
          label={{ as: "a", basic: true, content: commentCount }}
          labelPosition="right"
          onClick={commentOnPost}
          as={Link}
          to={`/posts/${id}`}
        />
      </Card.Content>
    </Card>
  );
};

export default MemeCard;
