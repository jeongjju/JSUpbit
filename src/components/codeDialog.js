import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import AllSensorSettingTable from '../table/allSensorSettingTable';
// import SelectDropdown from '../SelectDropdown'
// import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
// import { getDCUTypes, getDescriptions } from '../../data/edis';


export default function (props) {
	// const [dcuType, setDcuType] = React.useState('All');
	const [page, setPage] = React.useState(0);
	// const handleDropdownClick = (item) => {
	// 	setDcuType(item);
	// 	setPage(0); // DCU Type을 선택하면 첫 페이지로 돌아옴
	// }
	// const handleChangePage = (newPage) => {
	// 	setPage(newPage);
	// }
	// const dcuTypes = getDCUTypes();
	// const allSensorDescriptions = getDescriptions(dcuType);
	return (
		<div style={{ display: "none" }}>

			<Dialog
				open={props.open}
				onClose={props.onClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				// classes={{ paper: props.classes.dialogPaper }}
			>
				<DialogTitle id="alert-dialog-title" >
					{/* All Sensor Setting */}
					{/* <IconButton aria-label="close" style={{ float: "right" }} onClick={props.onClose}> */}
						{/* <CloseIcon></CloseIcon> */}
					{/* </IconButton> */}
					{/* <SelectDropdown style={{ width: "200px", fontSize: "15px" }} options={dcuTypes} onDropdownClick={handleDropdownClick}></SelectDropdown> */}
				</DialogTitle>
				<DialogContent>
					{/* <AllSensorSettingTable selectedOverviewSensors={props.selectedOverviewSensors} page={page} onPageChange={handleChangePage} position={props.position}
						onOverviewSensorChange={props.onOverviewSensorChange} allSensorDescriptions={allSensorDescriptions}>
					</AllSensorSettingTable> */}
				</DialogContent>
				<DialogActions>
				</DialogActions>
			</Dialog>
		</div>
	)

}