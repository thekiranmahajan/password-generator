import { useCallback, useState } from "react";

const App = () => {
  const [passLength, setPassLength] = useState(8);
  const [includeNum, setIncludeNum] = useState(false);
  const [includeChar, setIncludeChar] = useState(false);
  const [generatedPass, setGeneratedPass] = useState("");

  const passwordGenerator = useCallback(() => {
    let password = "";
    let stringArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (includeNum) {
      stringArray += "0123456789";
    }
    if (includeChar) {
      stringArray += "~`!@#$%^&*_-=+[]()";
    }
    for (let i = 1; i < stringArray.length; i++) {
      let char = Math.floor(Math.random() * stringArray + 1);

      password = stringArray.charAt(char);
    }
  }, [passLength, includeNum, includeChar, setGeneratedPass]);

  return (
    <div className="bg-slate-700 min-h-screen w-full flex justify-center items-center">
      <div
        className=" font-poppins w-full max-w-md mx-auto bg-slate-300 flex justify-center items-center rounded-lg px-4 py-3 my-8
      "
      >
        <h2 className="font-semibold">Password Generator</h2>
      </div>
    </div>
  );
};

export default App;
