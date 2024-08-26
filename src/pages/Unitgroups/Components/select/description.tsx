import LangTextItemDescription from '@/components/LangTextItem/description';
import { getReferenceUnit } from '@/services/unitgroups/api';
import { Card, Descriptions, Divider, Space } from 'antd';
import { FC, ReactNode, useEffect, useState } from 'react';
import { FormattedMessage } from 'umi';
import UnitGroupView from '../view';
type Props = {
  title: ReactNode | string;
  data: any;
  lang: string;
};

const UnitGroupSelectDescription: FC<Props> = ({ title, data, lang }) => {
  const [refUnit, setRefUnit] = useState<any>({});

  useEffect(() => {
    if (data?.['@refObjectId']) {
      getReferenceUnit(data?.['@refObjectId']).then((res) => {
        setRefUnit(res.data);
      });
    }
  }, [data]);

  return (
    <Card size="small" title={title}>
      <Space direction="horizontal">
        <Descriptions bordered size={'small'} column={1} style={{ width: '450px' }}>
          <Descriptions.Item
            key={0}
            label={
              <FormattedMessage
                id="pages.FlowProperties.view.flowPropertiesInformation.refObjectId"
                defaultMessage="Ref Object Id"
              />
            }
            labelStyle={{ width: '140px' }}
          >
            {data?.['@refObjectId'] ?? '-'}
          </Descriptions.Item>
        </Descriptions>
        {data?.['@refObjectId'] && (
          <UnitGroupView id={data?.['@refObjectId']} lang={lang} buttonType="text" />
        )}
      </Space>
      <br />
      <br />
      <Descriptions bordered size={'small'} column={1}>
        <Descriptions.Item
          key={0}
          label={
            <FormattedMessage
              id="pages.FlowProperties.view.flowPropertiesInformation.type"
              defaultMessage="Type"
            />
          }
          labelStyle={{ width: '140px' }}
        >
          {data?.['@type'] ?? '-'}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <Descriptions bordered size={'small'} column={1}>
        <Descriptions.Item
          key={0}
          label={
            <FormattedMessage
              id="pages.FlowProperties.view.flowPropertiesInformation.uri"
              defaultMessage="URI"
            />
          }
          labelStyle={{ width: '140px' }}
        >
          {data?.['@uri'] ?? '-'}
        </Descriptions.Item>
      </Descriptions>
      <br />
      {/* <Descriptions bordered size={'small'} column={1}>
        <Descriptions.Item key={0} label="Version" labelStyle={{ width: '120px' }}>
          {data?.['@version'] ?? '-'}
        </Descriptions.Item>
      </Descriptions> */}
      <Divider orientationMargin="0" orientation="left" plain>
        <FormattedMessage
          id="pages.FlowProperties.view.flowPropertiesInformation.shortDescription"
          defaultMessage="Short Description"
        />
      </Divider>
      <LangTextItemDescription data={data?.['common:shortDescription']} />
      <br />
      <Card
        size="small"
        title={
          <FormattedMessage
            id="pages.unitgroup.unit.quantitativeReference"
            defaultMessage="Quantitative Reference"
          />
        }
      >
        <Descriptions bordered size={'small'} column={1}>
          <Descriptions.Item
            key={0}
            label={<FormattedMessage id="pages.unitgroup.name" defaultMessage="Name" />}
            labelStyle={{ width: '100px' }}
          >
            {refUnit.refUnitName ?? '-'}
          </Descriptions.Item>
        </Descriptions>
        <br />
        <Divider orientationMargin="0" orientation="left" plain>
          <FormattedMessage id="pages.unitgroup.generalComment" defaultMessage="General Comment" />
        </Divider>
        <LangTextItemDescription data={refUnit.refUnitGeneralComment} />
      </Card>
    </Card>
  );
};

export default UnitGroupSelectDescription;
