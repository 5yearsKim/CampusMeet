
export const createSignal = /* GraphQL */ `
  mutation CreateSignal(
    $input: CreateSignalInput!
    $condition: ModelSignalConditionInput
  ) {
    createSignal(input: $input, condition: $condition) {
      id
      fromID
      toID
      state
      message
      createdAt
      updatedAt
    }
  }
`;

export const updateSignal = /* GraphQL */ `
  mutation UpdateSignal(
    $input: UpdateSignalInput!
    $condition: ModelSignalConditionInput
  ) {
    updateSignal(input: $input, condition: $condition) {
      id
      fromID
      toID
      state
      message
      createdAt
      updatedAt
    }
  }
`;

export const deleteSignal = /* GraphQL */ `
  mutation DeleteSignal(
    $input: DeleteSignalInput!
    $condition: ModelSignalConditionInput
  ) {
    deleteSignal(input: $input, condition: $condition) {
      id
      fromID
      toID
      message
      createdAt
      updatedAt
    }
  }
`;

