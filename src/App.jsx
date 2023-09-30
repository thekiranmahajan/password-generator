import { useCallback, useEffect, useState, useRef } from "react";

const App = () => {
  // useState Hook: defined variable which will change on UI
  const [passLength, setPassLength] = useState(8);
  const [includeNum, setIncludeNum] = useState(false);
  const [includeChar, setIncludeChar] = useState(false);
  const [generatedPass, setGeneratedPass] = useState("");

  // useRef Hook: provided a null as initial ref to useRef Hook
  const passwordRef = useRef(null);

  // Function to generate random password using useCallback Hook
  const passwordGenerator = useCallback(() => {
    let password = "";
    let stringArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (includeNum) stringArray += "0123456789";

    if (includeChar) stringArray += "~`!@#$%^&*_-=+[]()";

    for (let i = 1; i <= passLength; i++) {
      let char = Math.floor(Math.random() * stringArray.length + 1);

      password += stringArray.charAt(char);
    }

    setGeneratedPass(password);
  }, [passLength, includeNum, includeChar, setGeneratedPass]);

  // Function to copy generatedPass to clipboard
  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 25);
    window.navigator.clipboard.writeText(generatedPass);
  }, [generatedPass]);

  // useEffect Hook to keep eye on dependencies n from that call a given passwordGenerator function
  useEffect(() => {
    passwordGenerator();
  }, [passLength, includeNum, includeChar, passwordGenerator]);

  return (
    <div className="bg-slate-700 min-h-screen overflow-hidden w-full flex justify-center items-center px-4 flex-col">
      <div
        className=" font-poppins w-full max-w-screen-sm mx-auto bg-slate-300 flex justify-center items-center rounded-lg px-4 py-3 flex-col
      "
      >
        <h2 className="font-semibold text-xl mb-8 text-center">
          Password Generator
        </h2>

        <div className="flex w-full justify-center items-center gap-8 flex-wrap">
          <input
            ref={passwordRef}
            type="text"
            value={generatedPass}
            placeholder="Password"
            readOnly
            className="py-1 px-2 outline-none rounded-md w-full max-w-sm  "
          />

          <button
            onClick={copyToClipboard}
            className="py-1 px-2 rounded-md bg-blue-500 hover:scale-105 active:scale-95 text-white focus:ring-4 transform  duration-200 ease-in-out transition-transform  ring-blue-400"
          >
            Copy
          </button>
        </div>

        <div className="flex w-full flex-wrap justify-center items-center gap-6 mt-8 mb-2">
          <div className="flex justify-center items-center flex-wrap gap-2 ">
            <input
              id="passLength"
              type="range"
              min={8}
              max={25}
              value={passLength}
              className="cursor-pointer"
              onChange={(e) => {
                setPassLength(e.target.value);
              }}
            />
            <label htmlFor="passLength" className="mr-4">
              Length: {passLength}
            </label>
          </div>

          <div className="flex justify-center items-center flex-wrap gap-2">
            <input
              type="checkbox"
              defaultChecked={setIncludeChar}
              onChange={() => {
                setIncludeNum((prevIncludeNum) => !prevIncludeNum);
              }}
              id="includeNum"
            />
            <label htmlFor="includeNum">Numbers</label>
          </div>

          <div className="flex justify-center items-center flex-wrap gap-2">
            {" "}
            <input
              type="checkbox"
              defaultChecked={includeChar}
              onChange={() => {
                setIncludeChar((prevIncludeChar) => !prevIncludeChar);
              }}
              id="includeChar"
            />
            <label htmlFor="includeChar">Charactors</label>
          </div>
        </div>
      </div>
      <footer className="absolute bottom-1 text-center  font-poppins w-full  mx-auto bg-slate-300 flex justify-center items-center rounded-lg px-2 py-1 flex-col">
        Made with❤️by Kiran Mahajan
      </footer>
    </div>
  );
};

export default App;
