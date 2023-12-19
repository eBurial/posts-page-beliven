// This file should be used as middleware between frontend and posts context state and handling api calls.

const useFetchData = () => {
  const getPosts = () => {
    /*
         *  (async () => {
            try {
                // Show loading
                setIsLoading(true);
                const { data } = await axios.get<Array<Post>>('https://example.com/posts', {
                params: { filters },
                });
                dispatch({action: SET, state: data })
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
            })();
         * 
         * 
         */
  };

  // TODO: add other functions to manipulate posts ( like, create, etc...)
  return { getPosts };
};
