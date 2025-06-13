const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Department = require('../models/Department');
const Appointment = require('../models/Appointment');
const MedicalRecord = require('../models/MedicalRecord'); // Ensure you have this model

exports.getDashboardStats = async (req, res) => {
  try {
    const [totalPatients, totalDoctors, totalDepartments] = await Promise.all([
      Patient.countDocuments(),
      Doctor.countDocuments(),
      Department.countDocuments(),
    ]);

    // Appointments for today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const appointmentsToday = await Appointment.countDocuments({
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    // Latest 5 medical records
    const recentRecords = await MedicalRecord.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('patient doctor');

    res.status(200).json({
      totalPatients,
      totalDoctors,
      totalDepartments,
      appointmentsToday,
      recentRecords,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching dashboard stats' });
  }
};
