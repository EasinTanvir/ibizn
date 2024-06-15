import { baseUrl } from "@/src/config/serverConfig";
import { useEffect, useState } from "react";
import Region from "./Helpers/Region";
import Country from "./Helpers/Country";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useRouter } from "next/router";
import { Dropdown } from "flowbite-react";
import Loader from "@/src/components/core/shared/Loader/Loader";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";
const PendingBoatOrder = () => {
  const [statusLoader, setStatusLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [control, setControl] = useState(false);
  const [pendingBooking, setPendingBooking] = useState([]);
  const router = useRouter();
  useEffect(() => {
    setIsLoading(true);
    fetch(`${baseUrl}/boat-booking/pending-booking`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPendingBooking(data?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [control]);

  // handle booking status update
  const handleBookingStatusUpdate = (id, status) => {
    setStatusLoader(true);

    fetch(`${baseUrl}/boat-booking/update-status-by-admin/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
      body: JSON.stringify({ status: status }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          setStatusLoader(false);
          toast.success(`Booking ${data?.data?.bookingStatus} successfully`);
          setControl(!control);
        }
      })
      .catch((err) => {
        setStatusLoader(false);
        console.log(err);
        toast.error("Something went wrong");
      });
  };
  console.log(statusLoader);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="text-center">
            <th className="py-2 px-1 border-b">Booking Id</th>
            <th className="py-2 px-1 border-b">Booking Status</th>
            <th className="py-2 px-1 border-b">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {pendingBooking?.map((booking, index) => (
            <tr
              key={booking?._id}
              className={
                index % 2 === 0 ? "bg-gray-100 text-center" : "text-center"
              }
            >
              <td className="py-2 px-4 border-b">{booking?._id}</td>
              <td className="py-2 px-4 border-b">{booking?.bookingStatus}</td>

              <td className="py-2 px-4 border-b">
                <div className="space-x-3 flex justify-end">
                  <button
                    className="bg-green-500 text-white rounded-md px-2 py-1"
                    onClick={() =>
                      router.push(
                        `pending-orders/boat-order-edit/${booking?._id}`
                      )
                    }
                  >
                    View
                  </button>
                  {booking?.bookingStatus === "pending" && (
                    <>
                      <>
                        {statusLoader ? (
                          <ColorRing
                            visible={true}
                            height="40"
                            width="40"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={[
                              "#e15b64",
                              "#f47e60",
                              "#f8b26a",
                              "#abbd81",
                              "#849b87",
                            ]}
                          />
                        ) : (
                          <>
                            {" "}
                            <Dropdown label="Action" dismissOnClick={false}>
                              <Dropdown.Item
                                onClick={() =>
                                  handleBookingStatusUpdate(
                                    booking?._id,
                                    "approved"
                                  )
                                }
                              >
                                Approve
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() =>
                                  handleBookingStatusUpdate(
                                    booking?._id,
                                    "rejected"
                                  )
                                }
                              >
                                Reject
                              </Dropdown.Item>
                            </Dropdown>
                          </>
                        )}
                      </>
                    </>
                  )}
                  {booking?.bookingStatus == "accepted" && (
                    <button
                      onClick={() =>
                        handleBookingStatusUpdate(booking?._id, "confirmed")
                      }
                      className="bg-blue-500 rounded-md px-4 py-1 text-white"
                    >
                      Confirm
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingBoatOrder;
