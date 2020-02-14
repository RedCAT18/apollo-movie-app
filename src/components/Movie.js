import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const TOGGLE_LIKE_MOVIE = gql`
  mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!) {
    toggleLikeMovie(id: $id, isLiked: $isLiked) @client
  }
`;

const Container = styled.div`
  height: 260px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 7px;
  background-color: transparent;
  margin-bottom: 20px;
  position: relative;
`;

const Poster = styled.div`
  background-image: url(${props => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

const Button = styled.button`
  width: 60px;
  height: 25px;
  background-color: white;
  border: 1px solid gray;
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

export default ({ id, bg, isLiked, sug }) => {
  const [toggleLikeMovie] = useMutation(TOGGLE_LIKE_MOVIE, {
    variables: { id: parseInt(id), isLiked }
  });
  return (
    <>
      <Container>
        <Link to={`/${id}`}>
          <Poster bg={bg} />
        </Link>
        {sug ? (
          ''
        ) : (
          <Button onClick={toggleLikeMovie}>
            {isLiked ? 'Unlike' : 'Like'}
          </Button>
        )}
      </Container>
    </>
  );
};
