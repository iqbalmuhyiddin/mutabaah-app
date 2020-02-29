import React, { useEffect, useState } from "react";
import View from "./select-group-view";
import { db } from "config";

const Handler = ({ onSuccess, email, isOpen }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const _onSubmit = async () => {
    if (!selectedGroup) {
      alert("Pilih group terlebih dahulu");
      return;
    }
    const group = groups.find(item => item.id === selectedGroup);

    await db
      .collection("users")
      .doc(email)
      .update({ groupId: selectedGroup, groupName: group.name });

    return onSuccess();
  };

  const _changeGroup = id => {
    setSelectedGroup(id);
  };

  useEffect(() => {
    const _loadGroup = async () => {
      setLoading(true);
      const rsp = await db.collection("groups").get();

      setGroups(rsp.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };
    _loadGroup();
  }, []);

  return (
    <View
      isLoading={isLoading}
      onOk={_onSubmit}
      groups={groups}
      changeGroup={_changeGroup}
      isOpen={isOpen}
    />
  );
};

export default Handler;
