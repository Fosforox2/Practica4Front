"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import {
  GetSimpleCharactersQuery,
  GetSimpleCharactersQueryVariables,
} from "@/gql/graphql";
import { GET_SIMPLE_CHARACTERS } from "@/features/characters/queries";

export default function CharactersPage() {
  const [page, setPage] = useState(1);

  const { data, loading, error } = useQuery<
    GetSimpleCharactersQuery,
    GetSimpleCharactersQueryVariables
  >(GET_SIMPLE_CHARACTERS, {
    variables: { page },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>Characters</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {data?.characters?.results?.map((char) => {
          if (!char?.id) return null;

          return (
            <Link
              key={char.id}
              href={`/characters/${char.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: 10,
                  cursor: "pointer",
                }}
              >
                <img
                  src={char.image || ""}
                  alt={char.name || ""}
                  width={150}
                />
                <p><b>{char.name}</b></p>
                <p>{char.status}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div style={{ marginTop: "30px" }}>
        <button
          disabled={!data?.characters?.info?.prev}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 20px" }}>Page {page}</span>

        <button
          disabled={!data?.characters?.info?.next}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}