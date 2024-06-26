import { baseUrl } from "@/src/config/serverConfig";
import { useEffect, useState } from "react";
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
        console.log(data);
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
    fetch(`${baseUrl}/boat-booking/update-status-by-operator/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
      body: JSON.stringify({ status: status }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.success) {
          setStatusLoader(false);
          toast.success(`Booking ${data?.data?.bookingStatus} successfully`);
          setControl(!control);
        } else {
          setStatusLoader(false);
          toast.error(data?.message || "Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="overflow-x-auto mt-6">
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
                <div className="space-x-3 flex justify-center">
                  <button
                    className="bg-green-500 text-white rounded-md px-2 py-1"
                    onClick={() =>
                      router.push(
                        `pending-orders/boat-order-details/${booking?._id}`
                      )
                    }
                  >
                    View
                  </button>
                  {booking?.bookingStatus === "approved" && (
                    <>
                      <>
                        <>
                          {" "}
                          <button
                            className="bg-red-800 text-white px-3 py-1 rounded-md"
                            onClick={() =>
                              handleBookingStatusUpdate(
                                booking?._id,
                                "accepted"
                              )
                            }
                          >
                            {statusLoader ? (
                              <ColorRing
                                visible={true}
                                height="25"
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
                              "Accept"
                            )}
                          </button>
                        </>
                      </>
                    </>
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
