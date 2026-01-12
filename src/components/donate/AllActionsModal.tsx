"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem } from "@/store/slices/cartSlice";
import { cn } from "@/lib/utils";
import Tabs from "@/components/ui/Tabs";
import { Button } from "../ui/Button";

interface AllActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AllActionsModal: React.FC<AllActionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { content, backendData } = useAppSelector((state) => state.donation);
  const {
    allActionsCategories: staticCategories,
    allActions: staticActions,
    labels,
  } = content;

  const allActionsCategories =
    backendData?.funds?.allActionsCategories?.length > 0
      ? backendData.funds.allActionsCategories
      : staticCategories;

  const allActions = backendData?.funds?.allActions
    ? backendData.funds.allActions
    : staticActions;

  // Initialize state based on available categories
  const [activeTab, setActiveTab] = useState(
    allActionsCategories[0]?.value || "emergencies"
  );

  // Synchronize activeTab if backend data loads different categories
  useEffect(() => {
    if (allActionsCategories.length > 0) {
      const exists = allActionsCategories.some(
        (cat: any) => cat.value === activeTab
      );
      if (!exists) {
        setActiveTab(allActionsCategories[0].value);
      }
    }
  }, [allActionsCategories, activeTab]);
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const dispatch = useAppDispatch();

  const calculateTotal = () => {
    return Object.values(amounts).reduce(
      (acc, curr) => acc + (parseFloat(curr) || 0),
      0
    );
  };

  const handleValidate = () => {
    Object.entries(amounts).forEach(([id, amt]) => {
      const val = parseFloat(amt);
      if (val > 0) {
        // Find action in any category
        let action = null;
        for (const cat in allActions) {
          action = allActions[cat].find((a: any) => a.id === id);
          if (action) break;
        }

        if (action) {
          dispatch(
            addItem({
              id: Math.random().toString(36).substr(2, 9),
              causeId: action.id,
              name: action.name,
              amount: val,
            })
          );
        }
      }
    });
    setAmounts({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-3xl p-8">
      <h5 className="type-h5 uppercase font-black tracking-tight mb-4">
        {labels.allActionsTitle}
      </h5>

      <Tabs
        tabs={allActionsCategories}
        value={activeTab}
        onChange={setActiveTab}
        variant="filled"
        color="primary"
        size="lg"
        rounded="sm"
        className="mb-4 type-btn-1"
        tabClassName="font-black"
        inactiveTabClassName="border border-grey-divider"
        labelClassName="h-[20px]"
      />

      <div
        className="flex flex-col max-h-[400px] gap-3 overflow-y-auto mb-4 pr-3"
        style={{
          scrollbarColor: "#E5E7EB #FFF",
        }}
      >
        {allActions[activeTab]?.map((action: any) => (
          <div
            key={action.id}
            className="flex justify-between items-center py-1"
          >
            <span className="type-body-2 text-grey-grey font-bold!">
              {action.name} :
            </span>
            <div className="flex items-center gap-2 border-2 border-grey-divider rounded-lg px-4 py-2 bg-white focus-within:border-primary transition-all max-w-[100px]">
              <input
                type="number"
                placeholder="0"
                value={amounts[action.id] || ""}
                onChange={(e) =>
                  setAmounts((prev) => ({
                    ...prev,
                    [action.id]: e.target.value,
                  }))
                }
                className="w-full text-right outline-none bg-transparent font-black text-grey-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-grey-light"
              />
              <span className="type-body-2 font-bold! text-grey-inactive uppercase shrink-0">
                CHF
              </span>
            </div>
          </div>
        ))}
        {(!allActions[activeTab] || allActions[activeTab].length === 0) && (
          <div className="py-12 text-center text-grey-grey italic">
            No actions available for this category.
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-6 mt-8">
        <div className="flex justify-end gap-4 w-full">
          <Button
            onClick={onClose}
            variant="outline"
            color="royal-blue"
            size="lg"
          >
            {labels.cancel}
          </Button>
          <Button
            onClick={handleValidate}
            disabled={calculateTotal() === 0}
            color="yellow"
            size="lg"
            rounded
          >
            {labels.validate}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AllActionsModal;
