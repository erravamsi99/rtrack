export const createMockAxiosResponse = (data: any) => {
  return {
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  };
};