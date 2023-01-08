import React, { useState } from 'react';
import { AUTH_TOKEN } from '../constant';
import { timeDifferenceForDate } from '../utils';
import { gql, useMutation } from "@apollo/client"

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id,
        postedBy {
          name
        }
        createdAt,
        votes {
          id
        }
        description,
        url
      }
    }
  }
`;

const Link = (props) => {
  const [votedLink, setVotedLink] = useState(props.link)
  const [ vote ] = useMutation(VOTE_MUTATION,{
    variables: {linkId: props.link.id},
    onCompleted: (data) => {
      setVotedLink(() => ({...data.vote.link}))
    },
    onError: (error) => console.log(JSON.stringify(error, null, 2))
  })

  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{props.index + 1}.</span>
        {authToken && (
          <div
            className="ml1 gray f11"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              vote();
            }}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {votedLink.description} ({votedLink.url})
        </div>
        {(
          <div className="f6 lh-copy gray">
            {votedLink.votes.length} votes | by{' '}
            {votedLink.postedBy ? votedLink.postedBy.name : 'Unknown'}{' '}
            {timeDifferenceForDate(votedLink.createdAt)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Link;