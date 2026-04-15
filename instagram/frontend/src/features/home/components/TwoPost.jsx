import React, { useEffect } from "react";
import Card from "./Card";
import "./Card.scss";
import { usePost } from "../hooks/usePost";

const TwoPost = () => {

  const { loading, allpost, getAllpost } = usePost();

  useEffect(() => {

    getAllpost();

  }, []);

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <div className="allpost">

      <h1>All Posts</h1>

      {allpost?.map((post, idx) => {

        return <Card key={idx} post={post} />;

      })}

    </div>
  );
};

export default TwoPost;