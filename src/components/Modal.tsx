import { Dialog } from "@headlessui/react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  setModalOpen: (val: boolean) => void;
  title?: string;
  description?: string;
  children?: ReactNode;
}

const Modal = ({
  isOpen,
  setModalOpen,
  title,
  description,
  children,
}: ModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setModalOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/95" aria-hidden="true" />
      {/* Full-screen scrollable container */}
      <div className="fixed inset-0 overflow-y-auto">
        {/* Container to center the panel */}
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel>
            <Dialog.Title className={"title"}>{title}</Dialog.Title>
            <Dialog.Description>{description}</Dialog.Description>
            {children}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
