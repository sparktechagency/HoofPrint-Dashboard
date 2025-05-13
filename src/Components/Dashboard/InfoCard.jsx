function InfoCard({ title, value, icon }) {
    return (
      <div className="bg-[#4BADC9] rounded-md p-4 flex items-center">
        <div className="bg-[#3A9CB9] p-2 rounded-full mr-3">{icon}</div>
        <div>
          <h3 className="text-white text-sm font-medium">{title}</h3>
          <p className="text-white text-2xl font-bold">{value}</p>
        </div>
      </div>
    )
  }
  
  export default InfoCard
  