import Report from '../db/models/report.js';

//get all reports
export async function getAllReports(){
    let reports = await Report.find();
    return reports
}

//get reports by id
export async function getReportById(id){
    let report = await Report.findById({_id: id})
    return report
}

//create an report
export async function createReport(details){
    let newReport = new Report({
        type: details.type,
        description: details.description,
        resolved: details.resolved,
        reportDate: details.reportDate,
        reportImage: details.reportImage
    })

    let result = await newReport.save();
    return result
}

//update report
export async function updateReportById(id, details){
    const updatedReportDetails = {
        type: details.type,
        description: details.description,
        resolved: details.resolved,
        reportDate: details.reportDate,
        reportImage: details.reportImage
    }
    let updatedReport = await Report.findByIdAndUpdate(id, updatedReportDetails, { new: true })
    return updatedReport
}


export async function deleteReport(id) {
    let report = await Report.deleteOne({ _id: id });
    return report
};
