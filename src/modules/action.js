// types of action
const Types = {
    CREATE_ITEM: "CREATE_ITEM",
    DELETE_ITEM: "DELETE_ITEM",
    SIGN_IN: "SIGN_IN",
    SIGN_OUT: "SIGN_OUT",
    FILTER_BY_TAG: "FILTER_BY_TAG"
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
  const signOut = signIn => ({
    type: Types.SIGN_OUT,
    payload: signIn
  });
  const filterByTag = tag => ({
    type: Types.FILTER_BY_TAG,
    payload: tag
  });
  export default {
    createItem,
    deleteItem,
    signIn,
    signOut,
    filterByTag,
    Types
  };