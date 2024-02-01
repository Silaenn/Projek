import React, { useEffect, useState, useRef } from "react";
import arrow from "../assets/images/arrow.gif";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { warna } from "@/data/index";
import body from "@/assets/images/body.png";
import math from "@/assets/images/math.png";
import smk from "@/assets/images/smk.png";
import noData from "@/assets/images/no data.jpg";
import sound from "@/assets/images/klik.mp3";

const btnValues = [
  ["C", "DEL", "%", "÷"],
  [7, 8, 9, "×"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "+/-", "="],
];

// const warna = [{ badan: "green", angka: "red", operator: "yellow" }];

const HomePage = () => {
  const [displayValue, setDisplayValue] = useState("");
  const [calculatorColor, setCalculatorColor] = useState("");
  const [nextColor, setNextColor] = useState("");
  const [isColorApplied, setIsColorApplied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [audioRef] = useState(React.createRef());

  const playClickSound = () => {
    audioRef.current.play();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const initializeNextColor = (category, id) => {
    setNextColor(warna[category][id]);
    console.log("warna", warna[category][id]);
  };

  const applyNewColor = () => {
    setIsColorApplied(true);

    setCalculatorColor(nextColor);

    localStorage.setItem("calculatorColor", JSON.stringify(nextColor));
  };

  useEffect(() => {
    if (nextColor) {
      applyNewColor();
    }
  }, [nextColor]);

  useEffect(() => {
    const storedColor = localStorage.getItem("calculatorColor");
    if (storedColor) {
      setCalculatorColor(JSON.parse(storedColor));
      setIsColorApplied(true);
    }
  }, []);

  const getButtonClassName = (btn) => {
    // Add conditions based on button values to determine the class name
    switch (btn) {
      case "C":
      case "DEL":
      case "%":
      case "÷":
      case "×":
      case "-":
      case "+":
      case ".":
      case "+/-":
      case "=":
        return `button mathButtons`;
      default:
        return "button digits";
    }
  };

  const [scientificMode, setScientificMode] = useState(false);
  const [additionalButtons, setAdditionalButtons] = useState([]);

  const handleScientificModeToggle = () => {
    setScientificMode(!scientificMode);
    if (!scientificMode) {
      setAdditionalButtons([
        { label: "Phi", value: "π" },
        { label: "kuadrat", value: "√" },
        { label: "Pangkat 2", value: "x²" },
        { label: "pangkat 3", value: "x³" },
      ]);
    } else {
      setAdditionalButtons([]);
    }
    playClickSound();
  };

  const handleButtonClick = (btn) => {
    // Handle different button clicks here
    if (btn === "C") {
      setDisplayValue("");
    } else if (btn === "DEL") {
      setDisplayValue((prevValue) => prevValue.slice(0, -1));
    } else if (btn === "=") {
      try {
        let expression = displayValue.replace(/×/g, "*");
        expression = expression.replace(/÷/g, "/");

        expression = expression.replace(/(\d+)%/g, (_, p1) => p1 / 100);
        setDisplayValue(eval(expression).toString());
      } catch (error) {
        setDisplayValue("Error");
      }
    } else if (btn === "%") {
      setDisplayValue((prevValue) => {
        if (!prevValue.includes("%")) {
          return prevValue + "%";
        }
        return prevValue;
      });
    } else if (btn === "+/-") {
      setDisplayValue((prevValue) => {
        if (prevValue.startsWith("-")) {
          return prevValue.slice(1);
        } else {
          return "-" + prevValue;
        }
      });
    } else if (btn === "π") {
      setDisplayValue((prevValue) => prevValue + Math.PI);
    } else if (btn === "√") {
      setDisplayValue((prevValue) => prevValue + "√");
    } else if (btn === "x²") {
      setDisplayValue((prevValue) => prevValue + "^2");
    } else if (btn === "x³") {
      setDisplayValue((prevValue) => prevValue + "^3");
    } else {
      setDisplayValue((prevValue) => prevValue + btn);
    }
    playClickSound();
  };

  const scrollDown = (position) => {
    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-100">
      <div className="w-100 min-vh-100 bg-gray-800 flex items-center">
        <div
          className="container relative z-10 flex items-center px-6 py-16 mx-auto md:px-12 xl:py-5 "
          // style={{
          //   marginTop: "-150px",
          // }}
        >
          <div className="flex items-center ">
            <div className="relative z-10 flex flex-col items-start  lg:w-3/5 xl:w-2/5">
              <span className="font-bold text-yellow-400 uppercase flex items-center animate__animated animate__fadeInDown">
                <img
                  src={smk}
                  className="bg-white mr-2"
                  style={{
                    borderRadius: "70px",
                  }}
                  width={50}
                  alt=""
                />
                SMK PGRI PEKANBARU
              </span>
              <h1
                className="mt-4 text-6xl font-bold leading-tight text-white sm:text-7xl animate__animated animate__fadeInLeft"
                style={{
                  fontFamily: "NB-international",
                  lineHeight: "1.1",
                }}
              >
                Welcome to Calgenius
                <br />
                by Deo Silaen
              </h1>
              <button
                className="block px-4 py-3 mt-10 text-lg font-bold text-gray-800 uppercase bg-white rounded-lg hover:bg-gray-100 animate__animated animate__fadeInUp"
                onClick={() => scrollDown(800)}
              >
                Lihat Kalkulator
              </button>
            </div>
            <div className="ml-auto flex">
              <img
                src={math}
                width={600}
                alt=""
                className="animate__animated animate__fadeInRight"
              />
            </div>
          </div>
        </div>
      </div>
      <header
        className="inti"
        id="containerL"
        style={{
          marginTop: "90px",
        }}
      >
        <div className="containerL">
          <div className="warna mt-4" data-aos="fade-right">
            <h5 className="justify-center flex font-bold">
              Tentukan Warna Favoritmu
            </h5>
            <Input
              placeholder="Cari Jenis Warna"
              className="mb-3"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="max-h-80 pr-3 overflow-y-auto text-slate-200 text-sm">
              <div className="mt-1 rounded-md ">
                {Object.keys(warna).map((category) => {
                  // Pencarian berdasarkan kategori
                  const isCategoryMatched = category
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

                  // Menampilkan pesan "Kategori tidak ada" jika tidak ada kategori yang cocok
                  if (!isCategoryMatched) {
                    return null; // Tidak menampilkan apapun jika kategori tidak cocok dengan pencarian
                  }

                  return (
                    <div key={category}>
                      {Object.keys(warna[category]).map((id) => (
                        <div key={id}>
                          <div
                            className="badan"
                            style={{
                              backgroundColor: `${warna[category][id].badan}`,
                              borderTop: "1px solid black",
                              borderBottom: "1px solid black",
                              borderLeft: "1px solid black",
                              borderRight: "1px solid black",
                            }}
                          >
                            <p className="bg-slate-700 -tracking-tight hover-text">
                              {warna[category][id].badan}
                            </p>
                          </div>
                          <div
                            className="angka"
                            style={{
                              backgroundColor: `${warna[category][id].angka}`,
                              borderBottom: "1px solid black",
                              borderLeft: "1px solid black",
                              borderRight: "1px solid black",
                            }}
                          >
                            <p className="bg-slate-700 -tracking-tight hover-text">
                              {warna[category][id].angka}
                            </p>
                          </div>
                          <div
                            className="operator"
                            style={{
                              backgroundColor: `${warna[category][id].operator}`,
                              borderBottom: "1px solid black",
                              borderLeft: "1px solid black",
                              borderRight: "1px solid black",
                            }}
                          >
                            <p className="bg-slate-700 -tracking-tight hover-text">
                              {warna[category][id].operator}
                            </p>
                          </div>

                          <Button
                            className="mt-3 mb-5 bg-violet-950"
                            onClick={() => {
                              initializeNextColor(category, id);
                              applyNewColor();
                            }}
                          >
                            Ganti Warna
                          </Button>
                        </div>
                      ))}
                    </div>
                  );
                })}
                {/* Menampilkan pesan "Kategori tidak ada" jika tidak ada kategori yang cocok dengan pencarian */}
                {Object.keys(warna).length > 0 &&
                  Object.keys(warna).every(
                    (category) =>
                      !category.toLowerCase().includes(searchTerm.toLowerCase())
                  ) && (
                    <div className="flex justify-center items-center h-60 flex-col">
                      <img
                        src={noData}
                        width={200}
                        className="mb-6 mt-2"
                        alt=""
                      />
                      <p
                        className="text-black"
                        style={{
                          fontFamily: "Anonymous Pro",
                          fontSize: "17px",
                        }}
                      >
                        Kategori Warna Tidak ditemukan
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>

          <fieldset
            id="container"
            data-aos="zoom-in"
            style={{
              backgroundColor: isColorApplied ? calculatorColor.badan : "",
            }}
          >
            <form name="calculator">
              <input className="display" type="text" value={displayValue} />
              <div className="justify-center flex flex-wrap">
                <button
                  type="button"
                  style={{
                    width: "250px",
                    padding: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#DDE6ED",
                    border: "2px solid #181818",
                    marginBottom: "5px",
                    fontWeight: "bold",
                    color: "black",
                  }}
                  onClick={handleScientificModeToggle}
                >
                  {scientificMode ? "Simple" : "Scientific Calculator"}
                </button>
                {scientificMode &&
                  additionalButtons.map((button, index) => (
                    <button
                      type="button"
                      key={index}
                      className="button mathButtons"
                      onClick={() => handleButtonClick(button.value)}
                    >
                      {button.value}
                    </button>
                  ))}
                {btnValues.flat().map((btn, i) => (
                  <button
                    className={getButtonClassName(btn)}
                    type="button"
                    onClick={() => handleButtonClick(btn)}
                    value={btn}
                    key={i}
                    style={{
                      backgroundColor:
                        isColorApplied &&
                        (btn >= "0" && btn <= "9"
                          ? calculatorColor && calculatorColor.angka
                          : btn === "%" ||
                            btn === "÷" ||
                            btn === "×" ||
                            btn === "-" ||
                            btn === "+" ||
                            btn === "." ||
                            btn === "+/-" ||
                            btn === "=" ||
                            btn === "C" ||
                            btn === "DEL"
                          ? calculatorColor && calculatorColor.operator
                          : ""),
                    }}
                  >
                    {btn}
                  </button>
                ))}
              </div>
              <audio ref={audioRef} hidden>
                <source src={sound} type="audio/mp3" />
                Maaf, browser Anda tidak mendukung elemen audio.
              </audio>
            </form>
          </fieldset>

          <div className="petunjuk mt-4" data-aos="fade-left">
            <h5
              className="flex justify-center font-bold"
              style={{
                fontFamily: "Roboto Slab",
              }}
            >
              Petunjuk Mengubah Warna
            </h5>
            <div className="flex justify-center mt-3 mb-3">
              <img src={body} width={300} alt="" />
            </div>

            <ol>
              <li
                style={{
                  listStyle: "-moz-initial",
                  fontFamily: "Poppins",
                  fontSize: "15px",
                }}
              >
                Dalam mencari warna hanya terdapat beberapa opsi, anda bisa
                ketikan ini :
                <br />
              </li>
              <ul
                style={{
                  marginTop: "5px",
                  marginLeft: "-25px",
                }}
              >
                <li
                  className="color"
                  style={{
                    fontFamily: "Roboto Slab",
                  }}
                >
                  Default
                </li>
                <li
                  className="color"
                  style={{
                    fontFamily: "Roboto Slab",
                  }}
                >
                  Pastel
                </li>
                <li
                  className="color"
                  style={{
                    fontFamily: "Roboto Slab",
                  }}
                >
                  Cold
                </li>
                <li
                  className="color"
                  style={{
                    fontFamily: "Roboto Slab",
                  }}
                >
                  Sky
                </li>
                <li
                  className="color"
                  style={{
                    fontFamily: "Roboto Slab",
                  }}
                >
                  Rainbow
                </li>
                <li
                  className="color"
                  style={{
                    fontFamily: "Roboto Slab",
                  }}
                >
                  Coffee
                </li>
              </ul>
              <li
                style={{
                  listStyle: "-moz-initial",
                  marginTop: "5px",
                  fontFamily: "Roboto Slab",
                }}
              >
                Dan kamu bisa menentukan pilihan warna yang kamu suka, silahkan
                mencoba ya!
              </li>
            </ol>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HomePage;
