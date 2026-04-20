"use client";

import { useQuery } from "@apollo/client/react";
import { useParams } from "next/navigation";
import {GetCharacterDetailQuery, GetCharacterDetailQueryVariables } from "@/gql/graphql";
import { GET_COMPLEX_CHARACTER } from "@/features/characters/queries";

export default function CharacterDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { data, loading, error } = useQuery<
    GetCharacterDetailQuery,
    GetCharacterDetailQueryVariables
  >(GET_COMPLEX_CHARACTER, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const character = data?.character;

  if (!character) return <p>Character not found</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>{character.name}</h1>

      <img
        src={character.image || ""}
        alt={character.name || ""}
        width={250}
      />

      <p><b>Status:</b> {character.status}</p>
      <p><b>Species:</b> {character.species}</p>
      <p><b>Origin:</b> {character.origin?.name}</p>
    </div>
  );
}