import React from "react";
import { Button, Modal, Select, Spin } from "antd";

const { Option } = Select;

const Form = ({ onOk, isLoading, groups, changeGroup, isOpen }) => {
  const _handleSubmit = e => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    onOk();
  };

  return (
    <Modal
      title={"Pilih Group"}
      visible={isOpen}
      maskClosable={false}
      onOk={onOk}
      footer={null}
      closable={false}
    >
      <form onSubmit={_handleSubmit}>
        <Select
          onChange={value => changeGroup(value)}
          placeholder="Pilih Group"
          notFoundContent={isLoading ? <Spin size="small" /> : null}
          required
        >
          <Option value={null} disabled>
            Pilih Group
          </Option>
          {groups.map(group => (
            <Option key={group.id} value={group.id}>
              {group.name}
            </Option>
          ))}
        </Select>

        <div className="d-flex justify-content-end mt-2">
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            htmlType="submit"
            className="hs-btn orange"
          >
            Mulai
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default Form;
