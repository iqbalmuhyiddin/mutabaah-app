import React from "react";
import { DatePicker, InputNumber, Spin, Switch, Button } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { Label, Text } from "components";
import moment from "moment";
import { INPUT_TYPE } from "constant";
moment.locale("id");

const View = ({
  isLoading,
  isSaving,
  onChange,
  data,
  activites,
  onChangeDate,
  onSubmit
}) => {
  return (
    <div className="row d-flex justify-content-center">
      <div className="col-12 col-lg-4 bg-white rounded p-3">
        <Label>Tanggal</Label>
        <DatePicker
          placeholder="Pilih Tanggal"
          style={{ width: "100%" }}
          allowClear={false}
          className="mb-4"
          name="date"
          format="dddd, DD MMM YYYY"
          value={data.date ? moment(data.date, "YYYY-MM-DD") : null}
          onChange={date =>
            onChangeDate(date ? date.format("YYYY-MM-DD") : null)
          }
        />
        {isLoading && (
          <div className="text-center">
            <Spin />
          </div>
        )}
        {activites.map(activity => (
          <div key={activity.id} className="mb-3">
            <div>
              <Label isInline className="mr-2">
                {activity.name}{" "}
              </Label>
              {activity.description && (
                <Text isInline>({activity.description})</Text>
              )}
            </div>
            <RenderInput
              type={activity.type}
              value={data.activities[activity.id]}
              name={activity.id}
              onChange={onChange}
            />
          </div>
        ))}
        <div className="d-flex justify-content-end">
          <Button
            type="primary"
            onClick={onSubmit}
            loading={isLoading || isSaving}
          >
            Simpan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default View;

const RenderInput = ({ type, name, value, onChange }) => {
  if (type === INPUT_TYPE.BOOLEAN) {
    return (
      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        checked={value}
        onChange={e => onChange(name, e)}
      />
    );
  }
  return (
    <InputNumber
      type="number"
      value={value}
      name={name}
      className="w-50"
      onChange={val => onChange(name, val)}
    />
  );
};
