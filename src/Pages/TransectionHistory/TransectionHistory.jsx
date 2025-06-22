import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { MdBlock } from "react-icons/md";
import userImage from "../../assets/image/admin.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react";

function TransectionHistory() {
 const initialUsers = [
  {
    id: "#01",
    name: "Alice Johnson",
    date: "12.05.2025/10.25 AM",
    email: "alice.johnson@example.com",
    phone: "123-456-7890",
    transectionNo: "#256662FKEE",
    amount: "$30",
    avatar: "https://randomuser.me/api/portraits/women/59.jpg",
    location: "New York",
  },
  {
    id: "#02",
    name: "Michael Smith",
    email: "michael.smith@example.com",
    phone: "987-654-3210",
    transectionNo: "#745625XLM",
    amount: "$50",
    avatar: "https://randomuser.me/api/portraits/men/82.jpg",
    location: "Los Angeles",
    date: "12.05.2025/11.00 AM",
  },
  {
    id: "#03",
    name: "Emma Williams",
    email: "emma.williams@example.com",
    phone: "555-123-4567",
    transectionNo: "#6438LMK93",
    amount: "$120",
    avatar: "https://randomuser.me/api/portraits/women/94.jpg",
    location: "Chicago",
    date: "12.05.2025/11.30 AM",
  },
  {
    id: "#04",
    name: "Daniel Brown",
    email: "daniel.brown@example.com",
    phone: "444-987-6543",
    transectionNo: "#295A7XFG4",
    amount: "$75",
    avatar: "https://randomuser.me/api/portraits/men/64.jpg",
    location: "Houston",
    date: "12.05.2025/12.00 PM",
  },
  {
    id: "#05",
    name: "Olivia Davis",
    email: "olivia.davis@example.com",
    phone: "333-555-7777",
    transectionNo: "#585XQ989T",
    amount: "$90",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    location: "Phoenix",
    date: "12.05.2025/12.30 PM",
  },
  {
    id: "#06",
    name: "Liam Miller",
    email: "liam.miller@example.com",
    phone: "222-444-8888",
    transectionNo: "#8475KLMQ9",
    amount: "$40",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    location: "San Diego",
    date: "12.05.2025/01.00 PM",
  },
  {
    id: "#07",
    name: "Sophia Wilson",
    email: "sophia.wilson@example.com",
    phone: "111-999-5555",
    transectionNo: "#963YF562T",
    amount: "$60",
    avatar: "https://randomuser.me/api/portraits/men/97.jpg",
    location: "Dallas",
    date: "12.05.2025/01.30 PM",
  },
  {
    id: "#08",
    name: "Noah Moore",
    email: "noah.moore@example.com",
    phone: "666-777-8888",
    transectionNo: "#9576TNG73",
    amount: "$110",
    avatar: "https://randomuser.me/api/portraits/women/25.jpg",
    location: "Austin",
    date: "12.05.2025/02.00 PM",
  },
  {
    id: "#09",
    name: "Isabella Taylor",
    email: "isabella.taylor@example.com",
    phone: "777-888-9999",
    transectionNo: "#264TRF672",
    amount: "$80",
    avatar: "https://randomuser.me/api/portraits/men/19.jpg",
    location: "Miami",
    date: "12.05.2025/02.30 PM",
  },
  {
    id: "#10",
    name: "James Anderson",
    email: "james.anderson@example.com",
    phone: "555-555-5555",
    transectionNo: "#3956TK33M",
    amount: "$100",
    avatar: "https://randomuser.me/api/portraits/women/76.jpg",
    location: "Atlanta",
    date: "12.05.2025/03.00 PM",
  },
  {
    id: "#11",
    name: "Mia Thomas",
    email: "mia.thomas@example.com",
    phone: "888-777-6666",
    transectionNo: "#715X92KYM",
    amount: "$70",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    location: "Boston",
    date: "12.05.2025/03.30 PM",
  },
  {
    id: "#12",
    name: "Benjamin Jackson",
    email: "benjamin.jackson@example.com",
    phone: "444-333-2222",
    transectionNo: "#26462XGF3",
    amount: "$55",
    avatar: "https://randomuser.me/api/portraits/men/64.jpg",
    location: "Philadelphia",
    date: "12.05.2025/04.00 PM",
  },
  {
    id: "#13",
    name: "Charlotte White",
    email: "charlotte.white@example.com",
    phone: "123-789-4560",
    transectionNo: "#576TYNN6F",
    amount: "$65",
    avatar: "https://randomuser.me/api/portraits/women/94.jpg",
    location: "San Francisco",
    date: "12.05.2025/04.30 PM",
  },
  {
    id: "#14",
    name: "Lucas Harris",
    email: "lucas.harris@example.com",
    phone: "777-333-1111",
    transectionNo: "#82934TJGF",
    amount: "$85",
    avatar: "https://randomuser.me/api/portraits/men/82.jpg",
    location: "Las Vegas",
    date: "12.05.2025/05.00 PM",
  },
  {
    id: "#15",
    name: "Amelia Martin",
    email: "amelia.martin@example.com",
    phone: "555-222-3333",
    transectionNo: "#394T9F8HF",
    amount: "$95",
    avatar: "https://randomuser.me/api/portraits/women/59.jpg",
    location: "Denver",
    date: "12.05.2025/05.30 PM",
  },
  {
    id: "#16",
    name: "Elijah Thompson",
    email: "elijah.thompson@example.com",
    phone: "444-666-8888",
    transectionNo: "#738XNGG5F",
    amount: "$120",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    location: "Seattle",
    date: "12.05.2025/06.00 PM",
  },
  {
    id: "#17",
    name: "Harper Garcia",
    email: "harper.garcia@example.com",
    phone: "333-222-1111",
    transectionNo: "#24634KF3",
    amount: "$135",
    avatar: "https://randomuser.me/api/portraits/men/97.jpg",
    location: "Portland",
    date: "12.05.2025/06.30 PM",
  },
  {
    id: "#18",
    name: "William Martinez",
    email: "william.martinez@example.com",
    phone: "123-555-9999",
    transectionNo: "#347B58L6",
    amount: "$140",
    avatar: "https://randomuser.me/api/portraits/women/76.jpg",
    location: "Miami",
    date: "12.05.2025/07.00 PM",
  },
  {
    id: "#19",
    name: "Evelyn Robinson",
    email: "evelyn.robinson@example.com",
    phone: "888-666-4444",
    transectionNo: "#748X93AB",
    amount: "$150",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    location: "New York",
    date: "12.05.2025/07.30 PM",
  },
  {
    id: "#20",
    name: "Henry Clark",
    email: "henry.clark@example.com",
    phone: "777-555-4444",
    transectionNo: "#7435TGD3",
    amount: "$65",
    avatar: "https://randomuser.me/api/portraits/men/82.jpg",
    location: "Chicago",
    date: "12.05.2025/08.00 PM",
  },
  {
    id: "#21",
    name: "Abigail Rodriguez",
    email: "abigail.rodriguez@example.com",
    phone: "111-888-6666",
    transectionNo: "#2643G5YK",
    amount: "$75",
    avatar: "https://randomuser.me/api/portraits/women/59.jpg",
    location: "Houston",
    date: "12.05.2025/08.30 PM",
  },
  {
    id: "#22",
    name: "Sebastian Lewis",
    email: "sebastian.lewis@example.com",
    phone: "333-444-5555",
    transectionNo: "#389K64LM",
    amount: "$60",
    avatar: "https://randomuser.me/api/portraits/men/64.jpg",
    location: "Austin",
    date: "12.05.2025/09.00 PM",
  },
  {
    id: "#23",
    name: "Ella Lee",
    email: "ella.lee@example.com",
    phone: "666-555-4444",
    transectionNo: "#478X34MN",
    amount: "$120",
    avatar: "https://randomuser.me/api/portraits/men/19.jpg",
    location: "Dallas",
    date: "12.05.2025/09.30 PM",
  },
  {
    id: "#24",
    name: "Alexander Walker",
    email: "alexander.walker@example.com",
    phone: "555-444-3333",
    transectionNo: "#983Y672J",
    amount: "$50",
    avatar: "https://randomuser.me/api/portraits/women/76.jpg",
    location: "Atlanta",
    date: "12.05.2025/10.00 PM",
  },
  {
    id: "#25",
    name: "Avery Hall",
    email: "avery.hall@example.com",
    phone: "222-999-8888",
    transectionNo: "#746TY28M",
    amount: "$60",
    avatar: "https://randomuser.me/api/portraits/men/19.jpg",
    location: "Philadelphia",
    date: "12.05.2025/10.30 PM",
  },
  {
    id: "#26",
    name: "Jack Allen",
    email: "jack.allen@example.com",
    phone: "111-444-7777",
    transectionNo: "#263BYN82",
    amount: "$80",
    avatar: "https://randomuser.me/api/portraits/women/59.jpg",
    location: "San Diego",
    date: "12.05.2025/11.00 PM",
  },
  {
    id: "#27",
    name: "Scarlett Young",
    email: "scarlett.young@example.com",
    phone: "777-222-3333",
    transectionNo: "#852W6MN4",
    amount: "$110",
    avatar: "https://randomuser.me/api/portraits/men/64.jpg",
    location: "Seattle",
    date: "12.05.2025/11.30 PM",
  },
  {
    id: "#28",
    name: "Levi Hernandez",
    email: "levi.hernandez@example.com",
    phone: "888-111-4444",
    transectionNo: "#739BG4NR",
    amount: "$90",
    avatar: "https://randomuser.me/api/portraits/men/19.jpg",
    location: "Portland",
    date: "12.06.2025/12.00 AM",
  },
  {
    id: "#29",
    name: "Grace King",
    email: "grace.king@example.com",
    phone: "555-666-7777",
    transectionNo: "#284X5RYA",
    amount: "$75",
    avatar: "https://randomuser.me/api/portraits/women/76.jpg",
    location: "San Francisco",
    date: "12.06.2025/12.30 AM",
  },
  {
    id: "#30",
    name: "Matthew Wright",
    email: "matthew.wright@example.com",
    phone: "444-111-9999",
    transectionNo: "#6453J9F6",
    amount: "$130",
    avatar: "https://randomuser.me/api/portraits/men/82.jpg",
    location: "Las Vegas",
    date: "12.06.2025/01.00 AM",
  },
];


 const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalBlock, setIsModalBlock] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 14;

  const [startDate, setStartDate] = useState(new Date("2025-06-16"));
  const [endDate, setEndDate] = useState(new Date("2025-09-10"));
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredUsers(initialUsers);
    } else {
      const filtered = initialUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(term.toLowerCase()) ||
          user.email.toLowerCase().includes(term.toLowerCase()) ||
          user.location.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
    setCurrentPage(1);
  };

  const indexOfLastUser = currentPage * pageSize;
  const indexOfFirstUser = indexOfLastUser - pageSize;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleBlockUser = (user) => {
    setSelectedUser(user);
    setIsModalBlock(true);
  };

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const presets = [
    "Last 24 hours",
    "Last 7 days",
    "Last 30 days",
    "Custom Range",
  ];

  return (
      <>
      <div className="h-[calc(100vh-80px)] mt-16">
        <div className="flex justify-between p-4">
          <div className="w-72">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="flex items-center px-4 py-2 text-sm text-black border border-black rounded-md"
            >
              <CalendarDays className="w-5 h-5 mr-2" />
              {startDate?.toLocaleDateString()} to {endDate?.toLocaleDateString()}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#101749] ">
              <tr className="text-white">
                <th className="px-4 py-3 text-left">Serial</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Date & Time</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone Number</th>
                <th className="px-4 py-3 text-left">Transection No</th>
                <th className="px-4 py-3 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={index}>
                  <td className="px-4 text-black">{user.id}</td>
                  <td className="px-4 text-black">
                    <div className="flex gap-x-5">
                      <img
                        src={user.avatar}
                        alt="User Avatar"
                        className="object-cover w-10 h-10 rounded-full"
                      />
                      <p>{user.name}</p>
                    </div>
                  </td>
                  <td className="px-4 text-black">{user.date}</td>
                  <td className="px-4 text-black">{user.email}</td>
                  <td className="px-4 text-black">{user.phone}</td>
                  <td className="px-4 text-black">{user.transectionNo}</td>
                  <td className="px-4 text-black">{user.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center py-4">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="px-3 py-1 mx-1 text-black rounded-full disabled:opacity-50"
            disabled={currentPage === 1}
          >
            <IoIosArrowBack size={20} />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => onPageChange(index + 1)}
              className={`px-3 py-1 mx-1 rounded-full ${
                currentPage === index + 1
                  ? "text-white bg-[#101749]"
                  : "bg-transparent text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="px-3 py-1 mx-1 text-black rounded-full disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            <IoIosArrowForward size={20} />
          </button>
        </div>
      </div>

      {/* Calendar Popup */}
      {showCalendar && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-30"
            onClick={() => setShowCalendar(false)}
          />
          <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border rounded-md shadow-xl flex p-6 min-w-[700px]">
            {/* Date Inputs & Calendar */}
            <div className="grid grid-cols-2 gap-4 p-4">
              <div>
                <label className="text-sm font-semibold text-black">From</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd-MM-yyyy"
                  className="w-full px-3 py-2 mt-1 border"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-black">To</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="dd-MM-yyyy"
                  className="w-full px-3 py-2 mt-1 border"
                />
              </div>
              <div className="flex col-span-2 gap-6 mt-4">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  inline
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  inline
                />
              </div>
            </div>

            {/* Presets */}
            <div className="flex flex-col pl-4 border-l">
              {presets.map((item, idx) => (
                <button
                  key={idx}
                  className={`text-left px-4 py-2 hover:bg-gray-100 rounded-md text-sm ${
                    item === "Custom Range" ? "bg-orange-100 font-semibold" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
              <button
                className="px-4 py-2 mt-auto text-white bg-blue-900 rounded-md"
                onClick={() => setShowCalendar(false)}
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default TransectionHistory;
