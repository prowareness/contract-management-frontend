import React, { Component } from 'react';
import UploadService from '../services/upload-files.service';
import "./UploadFiles.css";

class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: undefined,
      progress: 0,
      message: '',
      userId: localStorage.getItem('userId'), 
      fileInfos: [],
      effectiveDate:'',
      expirationDate:'',
    };
  }

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
    });
  }

  upload() {
    const {userId, selectedFiles, effectiveDate, expirationDate} = this.state;
    if(!userId){
      console.log('user not logged in');
      return;
    }
    if(!selectedFiles || selectedFiles.length===0){
      console.log("No file selected");
      return;
    }

    const currentFile = selectedFiles[0];

    this.setState({
      progress: 0,
      message: '',
    });

    UploadService.upload(currentFile, userId, effectiveDate, expirationDate, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        const {fileInfos} = this.state;
        const existingFile = fileInfos.find(
          (file) => file.name === currentFile.name
        );

        if(existingFile){
          this.setState({
            message: "File updated successfully",
            selectedFiles: undefined,
          });
        } else {
          this.setState((prevState) => ({
            message: "File uploaded successfully",
            selectedFiles: undefined,
            fileInfos:[
              ...prevState.fileInfos,
              {
                name:currentFile.name,
                url:'',
                effectiveDate:effectiveDate,
                expirationDate:expirationDate,
                status:'',
              }
            ]
          }));
        }
        return UploadService.getUserFiles(userId);
      })
      .then((response) => {
        this.setState({
          fileInfos: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          progress: 0,
          message: 'Could not upload the file!',
          selectedFiles: undefined,
        });
      });
  }

  componentDidMount() {
    const {userId} = this.state;
    if(userId){
      UploadService.getUserFiles(userId).then((response) => {
          this.setState({
            fileInfos: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleEffectiveDateChange(event){
    this.setState({ effectiveDate: event.target.value});
  }

  handleExpirationDateChange(event){
    this.setState({ expirationDate: event.target.value});
  }

  async handleClickGenerateCSV() {
    try{
      const userId = localStorage.getItem('userId');
      const response = await UploadService.generateCSV(userId);
      const blob = new Blob([response.data],{type:'text/csv'});
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href=url;
      link.setAttribute('download','files.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
  } catch (error) {
      console.log(error);
  }
  }

  render() {
    const { selectedFiles, message, fileInfos, effectiveDate,expirationDate } = this.state;
    const {searchQuery} = this.props;

    const filterFileInfos = fileInfos.filter((file) =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="upload-container">
        <div className="upload-files-wrapper">
          <div className="upload-files-section">
            <div className="file-table-container">
              <table className="file-table">
                <thead>
                  <tr>
                    <th>Sr. No</th>
                    <th>Contract Name</th>
                    <th>Effective Date</th>
                    <th>Expiration Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className='file-content'>
                  {filterFileInfos.map((file, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <a href={file.url} className="file-link">
                          {file.name}
                        </a>
                      </td>
                      <td>{new Date(file.effectiveDate).toLocaleDateString('en-GB')}</td>
                      <td>{new Date(file.expirationDate).toLocaleDateString('en-GB')}</td>
                      <td>
                        <span
                          className={`status ${
                            file.expirationDate && new Date(file.expirationDate) >= new Date() ? 'active' : 'inactive'
                          }`}
                        >
                          {file.expirationDate && new Date(file.expirationDate) >= new Date() ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="upload-section">
              <label className="file-input-label">
                Select Contract: 
                <div className='select-contract-box'>
                  <input type="file" onChange={(e) => this.selectFile(e)} />
                </div>
              </label>
              <label className='effective-date-label'>
                Effective Date:
                <input type='date' value={effectiveDate} onChange={(e) => this.handleEffectiveDateChange(e)} />
              </label><br></br>
              <label className='expiration-date-label'>
                Expiration Date:
                <input type='date' value={expirationDate} onChange={(e) => this.handleExpirationDateChange(e)} />
              </label><br></br><br></br>
              <button
                className="upload-button"
                disabled={!selectedFiles}
                onClick={() => this.upload()}
              >
                Upload
              </button>
              {message && <div className="upload-message">{message}</div>}
            </div>
          </div>
          <div className="generate-csv-button-container">
            <button className="generate-csv-button" onClick={this.handleClickGenerateCSV}>
              Generate Report
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadFiles;
