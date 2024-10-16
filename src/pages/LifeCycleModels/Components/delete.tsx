import { deleteLifeCycleModel } from '@/services/lifeCycleModels/api';
import { DeleteOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import { Button, message, Modal, Tooltip } from 'antd';
import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';

type Props = {
  id: string;
  buttonType: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  setViewDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const LifeCycleModelDelete: FC<Props> = ({ id, buttonType, actionRef, setViewDrawerVisible }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const intl = useIntl();

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleOk = useCallback(() => {
    deleteLifeCycleModel(id).then(async (result: any) => {
      if (result.status === 204) {
        message.success(
          intl.formatMessage({
            id: 'pages.button.delete.success',
            defaultMessage: 'Selected record has been deleted.',
          }),
        );
        setViewDrawerVisible(false);
        setIsModalVisible(false);
        actionRef.current?.reload();
      } else {
        message.error(result.error.message ?? 'Error');
      }
    });
  }, [actionRef, id, setViewDrawerVisible]);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  return (
    <>
      <Tooltip title={<FormattedMessage id="pages.button.delete" defaultMessage="Delete" />}>
        {buttonType === 'icon' ? (
          <>
            <Button shape="circle" icon={<DeleteOutlined />} size="small" onClick={showModal} />
            <Modal
              title={<FormattedMessage id="pages.button.delete" defaultMessage="Delete" />}
              open={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <FormattedMessage
                id="pages.flows.deleteMessage"
                defaultMessage="Are you sure you want to delete this data?"
              />
            </Modal>
          </>
        ) : (
          <>
            <Button size="small" onClick={showModal}>
              <FormattedMessage id="pages.button.delete" defaultMessage="Delete" />
            </Button>
            <Modal
              title={<FormattedMessage id="pages.button.delete" defaultMessage="Delete" />}
              open={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <FormattedMessage
                id="pages.flows.deleteMessage"
                defaultMessage="Are you sure you want to delete this data?"
              />
            </Modal>
          </>
        )}{' '}
      </Tooltip>
    </>
  );
};

export default LifeCycleModelDelete;