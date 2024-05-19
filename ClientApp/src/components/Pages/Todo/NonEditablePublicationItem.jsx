import React, { useState, useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import Moment from "moment";
import "moment/locale/ru";
import { Card, Checkbox, Button, Tooltip, Flex, Space, Progress } from "antd";
import "../Todo/static/css/Todo.css";
import Meta from "antd/es/card/Meta";
import UpdatePublicationModal from "./Modals/UpdatePublicationModal";
import { getColorPublication } from "./Helpers/OptionsPriority";
import DeleteModal from "./Modals/DeletePublicationModal";
import { getPublications } from "./FetchData/GetPublications";

const PublicationItem = ({ publication, deleteAction, updateAction }) => {
  const colorPublication = getColorPublication(publication.priority);

  const [checked, setChecked] = useState(publication.isDone);

  const publicationCopy = { ...publication };

  const labelCheckBox = checked ? "Избранное" : "Добавить в избранное";

  return (
    <Card
      vertical
      size="small"
      style={{
        backgroundColor: colorPublication[0],
        margin: "10px",
        marginRight: "10px",
        borderColor: colorPublication[2],
        borderWidth: "2px",
      }}
    >
      <Flex justify="space-between" align="center" vertical>
        <div></div>
        
            <Space wrap>
                <Meta
                    description={`Дата публикации: ${Moment(new Date(publication.term)).format(
                        "D MMMM Y"
                    )}`}
                ></Meta>
              </Space>
              <h4 className="author-publication" style={{ fontSize: "50px" }}>
                  Автор: {publication.userId}
              </h4>
        <h4 className="title-publication" style={{ fontSize: "50px" }}>
          {publication.name}
        </h4>
        <p className="description-publication" style={{fontSize:"20px"}}>
            {publication.description}
        </p>
        <Space wrap>
          
          <Card
            size="big"
            style={{ width: "150pt" }}
            title={
              <Checkbox
                onChange={(e) => {
                  publication.isDone = e.target.checked;
                  setChecked(publication.isDone);
                  updateAction(publication.id, publication);
                }}
                checked={publication.isDone}
              >
                {labelCheckBox}
              </Checkbox>
            }
          >
          </Card>
        </Space>
      </Flex>
    </Card>
  );
};

export default PublicationItem;
