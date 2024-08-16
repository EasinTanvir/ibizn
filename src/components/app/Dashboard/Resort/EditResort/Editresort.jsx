import { compressAndConvertToBase64 } from "@/src/config/base64";
import { baseUrl } from "@/src/config/serverConfig";
import React from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Loader from "@/src/components/core/shared/Loader/Loader";
import Spinner from "@/src/components/core/shared/Loader/Spinner";
import { useState } from "react";
import BasicInfo from "./AllComponents/BasicInfo";
import PropertyDesc from "./AllComponents/PropertyDesc";
import Accommodation from "./AllComponents/Accommodation";
import Diving from "./AllComponents/Diving";
import FoodAtTheResort from "./AllComponents/FoodAtTheResort";
import Room from "./AllComponents/Room";
import CheckFields from "./AllComponents/CheckFields";
import EnvQAndA from "./AllComponents/EnvQAndA";
import { Checkbox, ListItemText } from "@mui/material";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Typography } from "@mui/material";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function EditResort({ id }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [customLoader, setCustomLoader] = React.useState(false);
  // some changes
  const [resortData, setResortData] = useState({});
  console.log(resortData?.listOfPackages);
  useEffect(() => {
    setLoading(true);
    setCustomLoader(true);
    fetch(`${baseUrl}/resorts/single-resort/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setResortData(data.data);
        setLoading(false);
        setCustomLoader(false);
      });
  }, [id && !resortData]);

  // update resort data
  const handleUpdateResortData = () => {
    setLoading(true);
    fetch(`${baseUrl}/resorts/update-resort/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
      body: JSON.stringify(resortData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success === true) {
          setLoading(false);
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Resort data updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          router.push("/dashboard/resort");
        }
      })
      .catch((err) => {
        console.log(err), setLoading(false);
      });
  };

  const handleResortDataChange = async (event, category) => {
    const { name, value } = event.target;
    if (name === "image") {
      const files = event.target.files[0];
      if (files && files.size > 2 * 1024 * 1024) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer:
            "File size exceeds the limit (2MB). Please choose a smaller file.",
        });
      } else {
        const compressedBase64 = await compressAndConvertToBase64(
          files,
          800,
          600,
          0.8
        );
        setResortData((prevState) => ({
          ...prevState,
          [category]: {
            ...prevState[category],
            [name]: compressedBase64,
          },
        }));
      }
    } else {
      setResortData((prevState) => ({
        ...prevState,
        [category]: {
          ...prevState[category],
          [name]: value, // Using computed property name
        },
      }));
    }
  };

  // ----------------------------------------------------------------
  const handleImageChanges = async (name, value) => {
    const files = value;
    if (files && files.size > 2 * 1024 * 1024) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer:
          "File size exceeds the limit (2MB). Please choose a smaller file.",
      });
    } else {
      const compressedBase64 = await compressAndConvertToBase64(
        files,
        800,
        600,
        0.8
      );
      let newValue = { ...resortData };
      newValue[name] = compressedBase64;
      setResortData(newValue);
    }
  };

  // handle environment questions change
  const handleEnvChange = (event) => {
    const { name, value } = event.target;

    setResortData((prevState) => ({
      ...prevState,
      environmentalQuestions: {
        ...prevState.environmentalQuestions,
        [name]: value,
      },
    }));
  };

  // handle check filed change
  const handleInputChange = (e) => {
    let newValue = { ...resortData };
    if (e.target.name === "special") {
      newValue[e.target.name] = e.target.checked;
    } else if (e.target.name === "equipmentAvailable") {
      newValue[e.target.name] = e.target.checked;
    } else if (e.target.name === "diveCourseAvailable") {
      newValue[e.target.name] = e.target.checked;
    } else {
      newValue[e.target.name] = e.target.value;
    }
    setResortData(newValue);
  };

  // const updatedResortData = {
  //   ...updatedResortValue,
  //   accommodation,
  //   diving,
  //   food,
  //   rooms,
  // };
  // console.log("updatedResortData", updatedResortData);

  console.log(resortData?.listOfPackages);

  const [packageData, setPackageData] = useState([]);
  //const [packages, setPackages] = useState([]);
  console.log(packageData);
  //console.log(packages);

  useEffect(() => {
    fetch(`${baseUrl}/packages/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPackageData(data?.data);
      })
      .catch((err) => {});
  }, []);

  //console.log(packages);

  //console.log(resortData?.listOfPackages);

  const [selectedIds, setSelectedIds] = useState([]);
  console.log(selectedIds);
  const handleChange = (event) => {
    const ids = event.target.value;

    console.log(event.target.value);
    setSelectedIds(event.target.value);
  };

  useEffect(() => {
    setResortData({
      ...resortData,
      listOfPackages: selectedIds,
    });
  }, [selectedIds]);

  useEffect(() => {
    if (resortData?.listOfPackages) {
      console.log(resortData?.listOfPackages);
      const rendom = resortData?.listOfPackages.map((data) => data?._id);
      console.log(rendom);
      setSelectedIds(rendom);
    }
  }, [customLoader]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {resortData && (
        <div>
          <div className="h-[80vh] overflow-y-scroll space-y-10">
            <BasicInfo
              resortData={resortData}
              setResortData={setResortData}
              handleImageChanges={handleImageChanges}
            />
            <div>
              {/* <div className="flex flex-wrap gap-2">
                {packages?.length > 0 &&
                  packages?.map((item) => (
                    <div className="flex items-center" key={item?._id}>
                      <h1>{item?.packageName}</h1>
                      <button
                        className="bg-rose-700 text-white"
                        onClick={() => {
                          const updateData = packages.filter(
                            (list) => list?._id !== item?._id
                          );
                          setPackages(updateData);
                        }}
                      >
                        delete
                      </button>
                    </div>
                  ))}
              </div> */}
              <div>
                <InputLabel className="text-secondary text-lg font-roboto mb-2">
                  Packages
                </InputLabel>
                <FormControl className="w-fit ">
                  <Select
                    labelId="multiple-select-label"
                    id="multiple-select"
                    multiple
                    value={selectedIds}
                    className="pe-3"
                    onChange={handleChange}
                    renderValue={(selected) =>
                      selected
                        .map(
                          (id) =>
                            packageData.find((option) => option._id === id)
                              ?.packageName
                        )
                        .join(", ")
                    }
                  >
                    {packageData.map((option) => (
                      <MenuItem key={option?._id} value={option?._id}>
                        <Checkbox
                          checked={selectedIds.indexOf(option._id) > -1}
                        />
                        <ListItemText primary={option?.packageName} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>

            <PropertyDesc
              resortData={resortData}
              setResortData={setResortData}
              handleImageChanges={handleImageChanges}
            />
            <Accommodation
              resortData={resortData}
              handleResortDataChange={handleResortDataChange}
            />
            <Diving
              resortData={resortData}
              handleResortDataChange={handleResortDataChange}
            />
            <FoodAtTheResort
              resortData={resortData}
              handleResortDataChange={handleResortDataChange}
            />
            <Room
              resortData={resortData}
              handleResortDataChange={handleResortDataChange}
            />
            <CheckFields
              resortData={resortData}
              setResortData={setResortData}
              handleInputChange={handleInputChange}
            />
            <EnvQAndA
              resortData={resortData}
              handleEnvChange={handleEnvChange}
            />
          </div>
          <div className="fixed bottom-10 right-10">
            <button
              onClick={handleUpdateResortData}
              type="submit"
              className="bg-green-500 px-10 py-3 text-white rounded-md font-semibold"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
