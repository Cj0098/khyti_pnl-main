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
import { asUploadButton } from "@rpldy/upload-button";
import retryEnhancer, { useRetry } from "@rpldy/retry-hooks";
import { Button, Card, Col, Row, Progress, PageHeader, Layout } from "antd";

import {
  CloudUploadOutlined,
  StopOutlined,
  RedoOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import "antd/dist/antd.css";
import "./styles.css";

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
    <Col gutter={2}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={url} />}
        actions={[
          <Button
            key="stop"
            icon={<StopOutlined />}
            onClick={onAbort}
            disabled={itemState !== STATES.PROGRESS}
            type="link"
          />,
          <Button
            key="retry"
            icon={<RedoOutlined />}
            onClick={onRetry}
            disabled={!isItemError(itemState)}
            type="link"
          />,
        ]}
      >
        <Card.Meta
          title={name}
          description={
            <Progress
              type="dashboard"
              percent={percent}
              width={66}
              strokeColor={
                isItemError(itemState)
                  ? "#FF4D4F"
                  : {
                      "0%": "#108ee9",
                      "100%": "#87d068",
                    }
              }
              status={isItemError(itemState) ? "exception" : undefined}
            />
          }
        />
      </Card>
    </Col>
  );
});

const UploadPreviewCards = ({ previewMethodsRef, setPreviews }) => {
  const getPreviewProps = useCallback(
    (item) => ({ id: item.id, name: item.file.name }),
    []
  );

  return (
    <Row gutter={2} justify="center" className="preview-row">
      <UploadPreview
        previewComponentProps={getPreviewProps}
        PreviewComponent={PreviewCard}
        onPreviewsChanged={setPreviews}
        previewMethodsRef={previewMethodsRef}
        rememberPreviousBatches
      />
    </Row>
  );
};

const UploadButton = asUploadButton(Button);

const UploadUi = () => {
  const previewMethodsRef = useRef();
  const [previews, setPreviews] = useState([]);

  const onClearPreviews = useCallback(() => {
    previewMethodsRef.current?.clear();
  }, [previewMethodsRef]);

  return (
    <Layout>
      <PageHeader
        title="File Upload"
        subTitle="Powered by: React Uploady + Ant Design"
        extra={[
          <UploadButton
            key="upload-button"
            extraProps={{
              type: "primary",
              size: "large",
              icon: <CloudUploadOutlined />,
            }}
          />,
          <Button
            key="clear-button"
            icon={<DeleteOutlined />}
            size="large"
            disabled={!previews.length}
            onClick={onClearPreviews}
          >
            Clear
          </Button>,
        ]}
      />
      <Layout.Content>
        <UploadPreviewCards
          setPreviews={setPreviews}
          previewMethodsRef={previewMethodsRef}
        />
      </Layout.Content>
      <Layout.Footer>Previews Shown: {previews.length}</Layout.Footer>
    </Layout>
  );
};

const mockEnhancer = getMockSenderEnhancer({ delay: 2000 });
// const enhancer = composeEnhancers(retryEnhancer, mockEnhancer);
const enhancer = composeEnhancers(mockEnhancer);

const App = () => {
  return (
    <div className="App">
      <Uploady enhancer={enhancer}>
        <UploadUi />
      </Uploady>
    </div>
  );
};

export default App;
