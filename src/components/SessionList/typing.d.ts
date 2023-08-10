type TGetData = (
  page: number,
  isToday: boolean,
) => {
  list: ISessionResponse[];
  total: number;
  isLoading: boolean;
};
