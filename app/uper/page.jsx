"use client";
import React, { useState, useCallback, useRef, memo } from "react";
import Uploady, {
  useItemProgressListener,
  useItemFinalizeListener,
  useItemAbortListener,
  useAbortItem,
} from "@rpldy/uploady";
import { composeEnhancers } from "@rpldy/uploader";
import UploadPreview from "@rpldy/upload-preview";
import { getMockSenderEnhancer } from "@rpldy/mock-sender";
import { UploadButton } from "@rpldy/upload-button";
import retryEnhancer, { useRetry } from "@rpldy/retry-hooks";

const STATES = {
  PROGRESS: "PROGRESS",
  DONE: "DONE",
  ABORTED: "ABORTED",
  ERROR: "ERROR",
};

const isItemError = (state) =>
  state === STATES.ABORTED || state === STATES.ERROR;

const PreviewCard = memo(({ id, url, name }) => {
  const [percent, setPercent] = useState(0);
  const [itemState, setItemState] = useState(STATES.PROGRESS);

  const abortItem = useAbortItem();
  const retry = null; //useRetry();

  useItemProgressListener((item) => {
    setPercent(item.completed);
  }, id);

  useItemFinalizeListener((item) => {
    setItemState(
      item.state === "finished"
        ? STATES.DONE
        : item.state === "aborted"
        ? STATES.ABORTED
        : STATES.ERROR
    );
  }, id);

  useItemAbortListener(() => {
    setItemState(STATES.ABORTED);
  }, id);

  const onAbort = useCallback(() => {
    abortItem(id);
  }, [abortItem, id]);

  const onRetry = useCallback(() => {
    retry(id);
  }, [retry, id]);

  return (
    <div>
      <img src={url} alt="" srcset="" />
      <button
        onClick={onAbort}
        disabled={itemState !== STATES.PROGRESS}
        type="link"
      >
        stop
      </button>
      <button onClick={onRetry} disabled={!isItemError(itemState)} type="link">
        retry
      </button>
    </div>
  );
});

const UploadPreviewCards = ({ previewMethodsRef, setPreviews }) => {
  const getPreviewProps = useCallback(
    (item) => ({ id: item.id, name: item.file.name }),
    []
  );

  return (
    <UploadPreview
      previewComponentProps={getPreviewProps}
      PreviewComponent={PreviewCard}
      onPreviewsChanged={setPreviews}
      previewMethodsRef={previewMethodsRef}
      rememberPreviousBatches
    />
  );
};

const UploadUi = () => {
  const previewMethodsRef = useRef();
  const [previews, setPreviews] = useState([]);

  const onClearPreviews = useCallback(() => {
    previewMethodsRef.current?.clear();
  }, [previewMethodsRef]);

  return (
    <div>
      <UploadButton />
      <button disabled={!previews.length} onClick={onClearPreviews}>
        Clear
      </button>

      <UploadPreviewCards
        setPreviews={setPreviews}
        previewMethodsRef={previewMethodsRef}
      />
    </div>
  );
};

const mockEnhancer = getMockSenderEnhancer({ delay: 2000 });
// const enhancer = composeEnhancers(retryEnhancer, mockEnhancer);
const enhancer = composeEnhancers(mockEnhancer);

const App = () => {
  return (
    <Uploady enhancer={enhancer}>
      <UploadUi />
    </Uploady>
  );
};

export default App;
