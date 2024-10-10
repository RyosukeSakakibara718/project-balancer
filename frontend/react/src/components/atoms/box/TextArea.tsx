// TextArea コンポーネント
const TextArea = ({
  value,
  onChange,
  isEdit,
}: {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isEdit: boolean;
}) => {
  return (
    <>
      {isEdit ? (
        <textarea
          className="p-2 w-full"
          rows={4}
          value={value}
          onChange={onChange}
        />
      ) : (
        <textarea
          className="p-2 w-full focus:outline-none cursor-default"
          rows={4}
          value={value}
          readOnly
        />
      )}
    </>
  );
};
export default TextArea;
