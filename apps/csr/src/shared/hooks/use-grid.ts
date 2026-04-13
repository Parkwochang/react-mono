import type { GridApi, GridReadyEvent } from 'ag-grid-community';
import { useCallback, useRef, useState } from 'react';

export const useGrid = () => {
  const gridRef = useRef<any>(null);

  const [isReady, setIsReady] = useState(false);

  const onGridReady = useCallback((event: GridReadyEvent) => {
    if (event.api) return setIsReady(true);
  }, []);

  // // 외부에서 호출할 공통 유틸리티 함수들을 여기서 정의
  // const selectAll = useCallback(() => {
  //   api?.selectAll();
  // }, [api]);

  return {
    gridRef, // <AgGridReact ref={gridRef} ... /> 에 연결
    isReady, // 직접 api 조작이 필요할 때
    onGridReady,
  };
};
