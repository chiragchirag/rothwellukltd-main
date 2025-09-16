import React from "react";
import { TableContainer } from "../../../CommonComponent";
import { MIX_MATCH_BY_ID} from "../../../Constant/TableConst";
import "./MIxMatchDetails.scss"

const MixMatchDetailView = ({mixMatchById}) => {
  return (
    <div className="mix-match-details">
      <TableContainer
        {...{
    
          isTableHeader: true,
          column: MIX_MATCH_BY_ID(),
          dataSource: mixMatchById,
          // setShowSuggestionList: () => {},
        }}
        classNames={"mix-match-details-table"}
      />

    </div>
  );
};

export default MixMatchDetailView;
