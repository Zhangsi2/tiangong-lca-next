import { getReferenceUnitGroup } from '@/services/flowproperties/api';
import { getReferenceProperty } from '@/services/flows/api';
import { jsonToList } from '@/services/general/util';
import { getReferenceUnit } from '@/services/unitgroups/api';
import { ProFormInstance } from '@ant-design/pro-components';
import { Card, Col, Divider, Form, Input, Row, Spin } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { FormattedMessage } from 'umi';
// import LangTextItemFrom from '@/components/LangTextItem/from';
const { TextArea } = Input;

type Props = {
  id: string | undefined;
  idType: string;
  name: any;
  formRef: React.MutableRefObject<ProFormInstance | undefined>;
};

const UnitGroupFromMini: FC<Props> = ({ id, idType, name, formRef }) => {
  const [spinning, setSpinning] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      if (idType === 'flow') {
        setSpinning(true);
        getReferenceProperty(id).then((res1: any) => {
          getReferenceUnitGroup(res1.data?.refFlowPropertytId).then((res2: any) => {
            formRef.current?.setFieldValue([...name, 'refUnitGroup'], {
              shortDescription: jsonToList(res2.data?.refUnitGroupShortDescription),
            });
            getReferenceUnit(res2.data?.refUnitGroupId).then((res3: any) => {
              formRef.current?.setFieldValue([...name, 'refUnitGroup', 'refUnit'], {
                name: res3.data?.refUnitName ?? '',
                generalComment: jsonToList(res3.data?.refUnitGeneralComment),
              });
              setSpinning(false);
            });
          });
        });
      } else if (idType === 'flowproperty') {
        setSpinning(true);
        getReferenceUnitGroup(id).then((res1: any) => {
          formRef.current?.setFieldValue([...name, 'refUnitGroup'], {
            shortDescription: jsonToList(res1.data?.refUnitGroupShortDescription),
          });
          getReferenceUnit(res1.data?.refUnitGroupId).then((res2: any) => {
            formRef.current?.setFieldValue([...name, 'refUnitGroup', 'refUnit'], {
              name: res2.data?.refUnitName ?? '',
              generalComment: jsonToList(res2.data?.refUnitGeneralComment),
            });
            setSpinning(false);
          });
        });
      }
    }
  }, [id]);

  return (
    <Spin spinning={spinning}>
      <Card
        size="small"
        title={
          <FormattedMessage
            id="pages.flowproperty.referenceToReferenceUnitGroup"
            defaultMessage="Reference Unit Group"
          />
        }
      >
        <Divider orientationMargin="0" orientation="left" plain>
          <FormattedMessage
            id="pages.unitgroup.edit.generalComment"
            defaultMessage="General Comment"
          />
        </Divider>
        <Form.Item>
          <Form.List name={[...name, 'refUnitGroup', 'shortDescription']}>
            {(subFields) => (
              <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                {subFields.map((subField) => (
                  <Row key={subField.key}>
                    <Col flex="100px" style={{ marginRight: '10px' }}>
                      <Form.Item noStyle name={[subField.name, '@xml:lang']}>
                        <Input disabled={true} style={{ width: '100px', color: '#000' }} />
                      </Form.Item>
                    </Col>
                    <Col flex="auto" style={{ marginRight: '10px' }}>
                      <Form.Item noStyle name={[subField.name, '#text']}>
                        <TextArea
                          placeholder="text"
                          rows={1}
                          disabled={true}
                          style={{ color: '#000' }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                ))}
                {subFields.length < 1 && <Input disabled={true} />}
              </div>
            )}
          </Form.List>
        </Form.Item>
        <Card
          size="small"
          title={
            <FormattedMessage
              id="pages.unitgroup.unit.quantitativeReference"
              defaultMessage="Quantitative Reference"
            />
          }
        >
          <Form.Item
            label={<FormattedMessage id="pages.unitgroup.edit.name" defaultMessage="Name" />}
            name={[...name, 'refUnitGroup', 'refUnit', 'name']}
          >
            <Input disabled={true} style={{ color: '#000' }} />
          </Form.Item>
          <Divider orientationMargin="0" orientation="left" plain>
            <FormattedMessage
              id="pages.unitgroup.edit.generalComment"
              defaultMessage="General Comment"
            />
          </Divider>
          <Form.Item>
            <Form.List name={[...name, 'refUnitGroup', 'refUnit', 'generalComment']}>
              {(subFields) => (
                <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                  {subFields.map((subField) => (
                    <Row key={subField.key}>
                      <Col flex="100px" style={{ marginRight: '10px' }}>
                        <Form.Item noStyle name={[subField.name, '@xml:lang']}>
                          <Input disabled={true} style={{ width: '100px', color: '#000' }} />
                        </Form.Item>
                      </Col>
                      <Col flex="auto" style={{ marginRight: '10px' }}>
                        <Form.Item noStyle name={[subField.name, '#text']}>
                          <TextArea
                            placeholder="text"
                            rows={1}
                            disabled={true}
                            style={{ color: '#000' }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  ))}
                  {subFields.length < 1 && <Input disabled={true} />}
                </div>
              )}
            </Form.List>
          </Form.Item>
        </Card>
      </Card>
    </Spin>
  );
};

export default UnitGroupFromMini;
