import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';


const CreateLink = () => {
  const [formState, setFormState] = useState({
    description: '',
    url: ''
  });
  const navigate = useNavigate();

  const CREATE_LINK_MUTATION = gql`
    mutation PostMutation (
        $description: String!,
        $url: String! 
    ) {
        post(description: $description, url: $url) {
            id
        }
    }`
  
    const GET_LINKS = gql`{
    feed {
      id
      links {
          id,
          createdAt
          description,
          url
      }
  }
  }`

    const [createLink] = useMutation(CREATE_LINK_MUTATION, {
      onCompleted: () => navigate('/'),
      refetchQueries: [{query: GET_LINKS}]
    });


  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.description}
            onChange={(e) =>
              setFormState({
                ...formState,
                description: e.target.value
              })
            }
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={formState.url}
            onChange={(e) =>
              setFormState({
                ...formState,
                url: e.target.value
              })
            }
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button 
        type="submit"
        onClick={() => createLink({
          variables: {
            description: formState.description,
            url: formState.url
        }
        })}
        >Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;