import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { ControllerRenderProps } from "react-hook-form";
import { VideoWithCategory } from "./AddVideoForm";

export type Item = {
  id: string;
  value: string;
};

type MultiSelectProps = {
  items: Item[];
  placeholder: string;
  field: ControllerRenderProps<VideoWithCategory, "category">;
  isReset: boolean;
  setIsReset: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MultiSelect: React.FC<MultiSelectProps> = ({
  items,
  placeholder,
  field,
  isReset = false,
  setIsReset,
}) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>(field.value || []);
  const [opened, setIsOpened] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperClientHeight, setWrapperClientHeight] = useState(40);

  const onClickWrapper = () => {
    setIsOpened(!opened);
  };

  const onClickDeleteItem = (id: string) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (wrapperRef && wrapperRef.current) {
      if (selectedItems.length > 0) {
        const newwrapperClientHeight =
          wrapperRef && wrapperRef.current
            ? wrapperRef.current.clientHeight
            : 40;

        setWrapperClientHeight(newwrapperClientHeight);
      } else {
        setWrapperClientHeight(40);
      }
    }
  }, [selectedItems]);

  useEffect(() => {
    if (selectedItems.length === items.length) {
      setIsOpened(false);
    }
  }, [selectedItems, items]);

  useEffect(() => {
    field.onChange(selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    if (isReset) {
      setSelectedItems(field.value);
      setIsReset(false);
    }
  }, [isReset]);

  function onDropDownClicked(newItem: Item) {
    setSelectedItems([...selectedItems, newItem]);
  }

  const filteredItems = items.filter(
    (item) => selectedItems.findIndex((sel) => sel.id === item.id) === -1
  );
  return (
    <div
      className="
        flex w-full h-auto justify-between items-center relative hover:cursor-pointer"
      onClick={onClickWrapper}
      ref={wrapperRef}
    >
      <div className="flex grow flex-wrap">
        {selectedItems.length === 0 && (
          <span className="p-2 pl-4">{placeholder} </span>
        )}
        {selectedItems.map(({ id, value }) => (
          <span
            className="bg-slate-100 p-2 border rounded-md m-1"
            key={id}
            onClick={(e) => e.stopPropagation()}
          >
            {" "}
            <span className="mr-2">{value}</span>
            <span
              className="mr-2"
              onClick={(e) => {
                e.stopPropagation();
                onClickDeleteItem(id);
              }}
            >
              <FontAwesomeIcon icon={faTimes} fontSize="10px" color="gray" />
            </span>
          </span>
        ))}
      </div>
      <span className="inline-block w-5 mr-4">
        <FontAwesomeIcon
          icon={opened ? faArrowUp : faArrowDown}
          fontSize="12px"
        />
      </span>
      {filteredItems.length > 0 && (
        <div
          style={{ top: `${wrapperClientHeight + 5}px` }}
          className={`w-full absolute bg-white left-0 ${
            opened ? "visible" : "invisible"
          } shadow-lg border rounded-md p-2`}
        >
          {filteredItems.map(({ id, value }) => (
            <li
              className="p-2 list-none rounded-sm hover:bg-slate-100"
              key={id}
              onClick={(e) => {
                e.stopPropagation();
                onDropDownClicked({ id, value });
              }}
            >
              {" "}
              {value}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};
