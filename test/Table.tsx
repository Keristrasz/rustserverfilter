import { useState } from "react";

type TableProps = {
  options: Array<string | number>;
  onChange: (selectedOptions: Array<string>) => void;
};

type TableRowProps = {
  option: string | number;
  isSelected: boolean;
  onChange: (value: string | number, checked: boolean) => void;
};

const TableRow: React.FC<TableRowProps> = ({ option, isSelected, onChange }) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    onChange(value, checked);
  };

  return (
    <tr key={option}>
      <td className="px-4 py-0.25 text-gray-700">{option}</td>
      <td className="px-4 py-0.25">
        <input
          type="checkbox"
          className="form-checkbox text-blue-600"
          value={option.toString()}
          checked={isSelected}
          onChange={handleOptionChange}
        />
      </td>
    </tr>
  );
};

const Table: React.FC<TableProps> = ({ options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionChange = (value: string | number, checked: boolean) => {
    const stringValue = value.toString(); // Convert the value to string
    if (checked) {
      setSelectedOptions((prevOptions) => [...prevOptions, stringValue]);
    } else {
      setSelectedOptions((prevOptions) =>
        prevOptions.filter((option) => option !== stringValue)
      );
    }
    onChange(selectedOptions); // Invoke the onChange callback with updated selectedOptions
  };

  return (
    <table className="mt-2 border border-gray-300">
      <thead>
        <tr>
          <th className="px-4 py-2 font-medium text-gray-700">Option</th>
          <th className="px-4 py-2 font-medium text-gray-700">Select</th>
        </tr>
      </thead>
      <tbody>
        {options.map((option) => (
          <TableRow
            key={option}
            option={option}
            isSelected={selectedOptions.includes(option.toString())}
            onChange={handleOptionChange}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;

// Usage example:
// const ratesOptions = ["Option 1", "Option 2", "Option 3"];

// const ExampleComponent: React.FC = () => {
//   const [isTableVisible, setIsTableVisible] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

//   const handleSelectClick = () => {
//     setIsTableVisible(!isTableVisible);
//   };

//   const handleTableChange = (selectedOptions: Array<string>) => {
//     setSelectedOptions(selectedOptions);
//   };

//   return (
//     <div>
//       <div className="relative inline-block">
//         <button
//           type="button"
//           className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           onClick={handleSelectClick}
//         >
//           Select Options
//         </button>
//         {isTableVisible && <Table options={ratesOptions} onChange={handleTableChange} />}
//       </div>
//       <div>Selected Options: {selectedOptions.join(", ")}</div>
//     </div>
//   );
// };
