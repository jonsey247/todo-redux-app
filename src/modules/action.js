// types of action
const Types = {
    CREATE_ITEM: "CREATE_ITEM",
    DELETE_ITEM: "DELETE_ITEM",
    SIGN_IN: "SIGN_IN"
  };
  // actions
  const createItem = task => ({
    type: Types.CREATE_ITEM,
    payload: task
  });
  const deleteItem = id => ({
    type: Types.DELETE_ITEM,
    payload: id
  });
  const signIn = signIn => ({
    type: Types.SIGN_IN,
    payload: signIn
  });
  export default {
    createItem,
    deleteItem,
    signIn,
    Types
  };