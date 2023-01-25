import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState();

  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    console.log("category pins are loading");
    if (categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      console.log("pins are loading");
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  const ideaName = categoryId || "new";

  if (loading)
    return (
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    );

  if (!pins?.length)
    return (
      <h2 className="flex justify-center items-center font-bold h-4/5">
        No Pins Available !
      </h2>
    );
  return <div> {pins && <MasonryLayout pins={pins} />}</div>;
};

export default React.memo(Feed);
