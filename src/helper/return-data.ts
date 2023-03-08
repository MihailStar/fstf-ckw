const dataKey = 'data';

type DataKey = typeof dataKey;

function returnData<Data>(data: Data): Record<DataKey, Data> {
  return { [dataKey]: data };
}

type ReturnData<Data> = ReturnType<typeof returnData<Data>>;

export { dataKey, DataKey, returnData, ReturnData };
