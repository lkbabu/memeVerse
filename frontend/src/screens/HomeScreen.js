import React, { useContext } from "react";
import { useQuery } from "@apollo/client";

import { Grid } from "semantic-ui-react";
import MemeCard from "../components/MemeCard";
import { AuthContext } from "../util/authorization";
import { FETCH_POSTS_QUERY } from "../util/Query";
import MemeForm from "../components/MemeForm";

const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <>
      <Grid columns={3}>
        <Grid.Row className="app-title">
          <h1>Latest Memes</h1>
        </Grid.Row>
        <Grid.Row>
          {user && (
            <Grid.Column>
              <MemeForm />
            </Grid.Column>
          )}

          {loading ? (
            <h1>loading....</h1>
          ) : (
            data.getPosts &&
            data.getPosts.map((post) => (
              <Grid.Column
                key={post.id}
                style={{ marginBottom: 20, marginTop: 20 }}
              >
                <MemeCard post={post} />
              </Grid.Column>
            ))
          )}
        </Grid.Row>
      </Grid>
    </>
  );
};

export default HomeScreen;
