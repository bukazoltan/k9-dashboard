import { createLocalStorageStateHook } from "use-local-storage-state";

const useCurrentPage = createLocalStorageStateHook("currentPage", 1);
const useLastPage = createLocalStorageStateHook("lastPage", 1);

export { useCurrentPage, useLastPage };
