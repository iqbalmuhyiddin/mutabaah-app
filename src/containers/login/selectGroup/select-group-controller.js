import React, { useEffect, useState } from "react";
import View from "./select-group-view";
import { firebase } from "config";

const Handler = ({ onSuccess, email }) => {
  const db = firebase.firestore();
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

    onSuccess();
  };

  const _changeGroup = id => {
    setSelectedGroup(id);
  };

  const _loadGroup = async () => {
    setLoading(true);
    const rsp = await db.collection("groups").get();

    setGroups(rsp.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  };

  useEffect(() => {
    _loadGroup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View
      isLoading={isLoading}
      onOk={_onSubmit}
      groups={groups}
      changeGroup={_changeGroup}
    />
  );
};

export default Handler;
