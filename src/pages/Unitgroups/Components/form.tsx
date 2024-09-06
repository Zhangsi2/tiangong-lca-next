import LangTextItemForm from '@/components/LangTextItem/form';
import LevelTextItemForm from '@/components/LevelTextItem/form';
import SourceSelectForm from '@/pages/Sources/Components/select/form';
import { ListPagination } from '@/services/general/data';
import { UnitTable } from '@/services/unitgroups/data';
import { genUnitTableData } from '@/services/unitgroups/util';
import { CheckCircleTwoTone, CloseCircleOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProFormInstance, ProTable } from '@ant-design/pro-components';
import { Card, Form, Input, Space } from 'antd';
import { FC, useRef } from 'react';
import { FormattedMessage } from 'umi';
import UnitCreate from './Unit/create';
import UnitDelete from './Unit/delete';
import UnitEdit from './Unit/edit';
import UnitView from './Unit/view';

type Props = {
  lang: string;
  activeTabKey: string;
  formRef: React.MutableRefObject<ProFormInstance | undefined>;
  onData: () => void;
  onUnitData: (data: any) => void;
  onUnitDataCreate: (data: any) => void;
  onTabChange: (key: string) => void;
  unitDataSource: UnitTable[];
};

export const UnitGroupForm: FC<Props> = ({
  lang,
  activeTabKey,
  formRef,
  onData,
  onUnitData,
  onUnitDataCreate,
  onTabChange,
  unitDataSource,
}) => {
  const actionRefUnitTable = useRef<ActionType>();
  const tabList = [
    {
      key: 'unitGroupInformation',
      tab: (
        <FormattedMessage
          id="pages.unitgroup.edit.unitGroupInformation"
          defaultMessage="UnitGroup Information"
        />
      ),
    },
    {
      key: 'modellingAndValidation',
      tab: (
        <FormattedMessage
          id="pages.unitgroup.edit.modellingAndValidation"
          defaultMessage="Modelling And Validation"
        />
      ),
    },
    {
      key: 'administrativeInformation',
      tab: (
        <FormattedMessage
          id="pages.unitgroup.edit.administrativeInformation"
          defaultMessage="Administrative Information"
        />
      ),
    },
    {
      key: 'units',
      tab: <FormattedMessage id="pages.unitgroup.edit.units" defaultMessage="Units" />,
    },
  ];
  const unitColumns: ProColumns<UnitTable>[] = [
    {
      title: (
        <FormattedMessage id="pages.table.title.index" defaultMessage="Index"></FormattedMessage>
      ),
      valueType: 'index',
      search: false,
    },
    // {
    //     title: <FormattedMessage id="pages.unitgroup.unit.dataSetInternalID" defaultMessage="DataSet Internal ID"></FormattedMessage>,
    //     dataIndex: 'dataSetInternalID',
    //     search: false,
    // },
    {
      title: (
        <FormattedMessage id="pages.table.title.name" defaultMessage="Name"></FormattedMessage>
      ),
      dataIndex: 'name',
      search: false,
    },
    {
      title: (
        <FormattedMessage
          id="pages.unitgroup.unit.generalComment"
          defaultMessage="General Comment"
        ></FormattedMessage>
      ),
      dataIndex: 'generalComment',
      search: false,
    },
    {
      title: (
        <FormattedMessage
          id="pages.unitgroup.unit.meanValue"
          defaultMessage="Mean Value"
        ></FormattedMessage>
      ),
      dataIndex: 'meanValue',
      search: false,
    },
    {
      title: (
        <FormattedMessage
          id="pages.unitgroup.unit.quantitativeReference"
          defaultMessage="Quantitative Reference"
        />
      ),
      dataIndex: 'quantitativeReference',
      sorter: false,
      search: false,
      render: (_, row) => {
        if (row.quantitativeReference) {
          return <CheckCircleTwoTone twoToneColor="#52c41a" />;
        }
        return <CloseCircleOutlined />;
      },
    },
    {
      title: (
        <FormattedMessage id="pages.table.title.option" defaultMessage="Option"></FormattedMessage>
      ),
      valueType: 'option',
      search: false,
      render: (_, row) => {
        return [
          <Space size={'small'} key={0}>
            <UnitView id={row.dataSetInternalID} data={unitDataSource} buttonType={'icon'} />
            <UnitEdit
              id={row.dataSetInternalID}
              data={unitDataSource}
              buttonType={'icon'}
              actionRef={actionRefUnitTable}
              onData={onUnitData}
              setViewDrawerVisible={() => {}}
            />
            <UnitDelete
              id={row.dataSetInternalID}
              data={unitDataSource}
              buttonType={'icon'}
              actionRef={actionRefUnitTable}
              setViewDrawerVisible={() => {}}
              onData={onUnitData}
            />
          </Space>,
        ];
      },
    },
  ];
  const tabContent: { [key: string]: JSX.Element } = {
    unitGroupInformation: (
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card
          size="small"
          title={
            <FormattedMessage
              id="pages.unitgroup.edit.unitGroupInformation.name"
              defaultMessage="Name"
            />
          }
        >
          <LangTextItemForm
            name={['unitGroupInformation', 'dataSetInformation', 'common:name']}
            label={
              <FormattedMessage
                id="pages.unitgroup.edit.unitGroupInformation.name"
                defaultMessage="Name"
              />
            }
          ></LangTextItemForm>
        </Card>
        <Card
          size="small"
          title={
            <FormattedMessage
              id="pages.unitgroup.edit.unitGroupInformation.classification"
              defaultMessage="Classification"
            />
          }
        >
          <LevelTextItemForm
            name={[
              'unitGroupInformation',
              'dataSetInformation',
              'classificationInformation',
              'common:classification',
              'common:class',
            ]}
            dataType={'UnitGroup'}
            formRef={formRef}
            onData={onData}
          />
        </Card>
        <Form.Item
          label="ID" //这是翻译哪一个
          name={['unitGroupInformation', 'dataSetInformation', 'common:UUID']}
          hidden
        >
          <Input></Input>
        </Form.Item>
      </Space>
    ),
    modellingAndValidation: (
      <Space direction="vertical" style={{ width: '100%' }}>
        <SourceSelectForm
          name={[
            'modellingAndValidation',
            'complianceDeclarations',
            'compliance',
            'common:referenceToComplianceSystem',
          ]}
          label={
            <FormattedMessage
              id="pages.unitgroup.edit.modellingAndValidation.referenceToComplianceSystem"
              defaultMessage="Reference To Compliance System"
            />
          }
          lang={lang}
          formRef={formRef}
          onData={onData}
        />
        <Form.Item
          label={
            <FormattedMessage
              id="pages.unitgroup.edit.modellingAndValidation.approvalOfOverallCompliance"
              defaultMessage="Approval Of Overall Compliance"
            />
          }
          name={[
            'modellingAndValidation',
            'complianceDeclarations',
            'compliance',
            'common:approvalOfOverallCompliance',
          ]}
        >
          <Input></Input>
        </Form.Item>
      </Space>
    ),
    administrativeInformation: (
      <Space direction="vertical" style={{ width: '100%' }}>
        <Form.Item
          label={
            <FormattedMessage
              id="pages.unitgroup.edit.administrativeInformation.timeStamp"
              defaultMessage="Time Stamp"
            />
          }
          name={['administrativeInformation', 'dataEntryBy', 'common:timeStamp']}
        >
          <Input disabled={true} style={{ color: '#000' }} />
        </Form.Item>
        <SourceSelectForm
          name={['administrativeInformation', 'dataEntryBy', 'common:referenceToDataSetFormat']}
          label={
            <FormattedMessage
              id="pages.unitgroup.edit.administrativeInformation.referenceToDataSetFormat"
              defaultMessage="Reference To DataSet Format"
            />
          }
          lang={lang}
          formRef={formRef}
          onData={onData}
        />
        <Form.Item
          label={
            <FormattedMessage
              id="pages.unitgroup.edit.administrativeInformation.dataSetVersion"
              defaultMessage="DataSet Version"
            />
          }
          name={['administrativeInformation', 'publicationAndOwnership', 'common:dataSetVersion']}
        >
          <Input />
        </Form.Item>
      </Space>
    ),
    units: (
      <ProTable<UnitTable, ListPagination>
        actionRef={actionRefUnitTable}
        search={{
          defaultCollapsed: false,
        }}
        pagination={{
          showSizeChanger: false,
          pageSize: 10,
        }}
        toolBarRender={() => {
          return [<UnitCreate key={0} onData={onUnitDataCreate}></UnitCreate>];
        }}
        dataSource={genUnitTableData(unitDataSource, lang)}
        columns={unitColumns}
      ></ProTable>
    ),
  };

  return (
    <>
      <Card
        style={{ width: '100%' }}
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
      >
        {tabContent[activeTabKey]}
      </Card>
      <Form.Item name="id" hidden>
        <Input />
      </Form.Item>
    </>
  );
};