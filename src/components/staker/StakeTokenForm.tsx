import { StakedTokenParams } from "@/types";
import { useState } from "react";

interface StakedTokenFormProps {
  setSelectedValues: (tokens: StakedTokenParams[]) => void;
}

const StakeTokenForm = (
  {setSelectedValues}: StakedTokenFormProps
) => {
  const [addressInput, setAddressInput] = useState("");
  const [numberInput, setNumberInput] = useState<number | null>(null);
  const handleAddressInput = (e: React.FormEvent<HTMLInputElement>) => {
    setAddressInput(e.currentTarget.value);
  };

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = !Number.isNaN(e.target.valueAsNumber)
      ? e.target.valueAsNumber
      : null;

    setNumberInput(value);
  };

  const handleAddToList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSelectedValues((prev) => [
      ...prev,
      { tokenAddress: addressInput, tokenId: numberInput },
    ]);
    setAddressInput('');
    setNumberInput(null);
  };

  const handleClearList = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedValues([]);
  };

  return (
    <form onSubmit={handleAddToList} className="pt-4">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-token-address"
          >
            Token address
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            id="inline-token-address"
            type="text"
            placeholder="0x8fD0ca99D26cb4Eacc2d4D2890Ee1327eAEf0736"
            onChange={handleAddressInput}
            value={addressInput}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-token-id"
          >
            Token id
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            id="inline-token-id"
            type="number"
            placeholder="123"
            onChange={handleNumberInput}
            value={numberInput ?? ''}
          />
        </div>
      </div>
      <div className="flex">
        <button className="btn-secondary py-1 px-2">+ Add to list</button>
        <div className="pl-2">
          <button className="btn-secondary py-1 px-2" onClick={handleClearList}>
            x Clear list
          </button>
        </div>
      </div>
    </form>
  );
};

export default StakeTokenForm;