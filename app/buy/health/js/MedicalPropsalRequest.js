var healthProposalRequestDef = {
	"carrierId":0,
	"planId":0,
	"documentType":"HealthProposalRequest",
	"proposerInfo":{
		"personalInfo":{
			"salutation":"",
			"firstName":"",
			"middleName":"",
			"lastName":"",
			"gender":"",
			"martialStatus":"",
			"pancard":"",
			"occupation":"",
			"annualIncome":"",
			"dateOfBirth":null
		},
		"contactInfo":{
			"houseNo":"",
			"streetDetails":"",
			"locality":"",
			"pincode":0,
			"city":"",
			"state":"",
			"emailId":"",
			"mobile":"",
			"phone":""
		}
			
	},
	"insuredMembers":[
	],
	"nomineeDetails":{
		"firstName":"",
		"middleName":"",
		"lastName":"",
		"gender":"",
		"dateOfBirth":null,
		"proposerRelationship":"",
		"salutation":"",
		"apointeeDetails":{
			"firstName":"",
			"middleName":"",
			"lastName":"",
			"gender":"",
			"age":"",
			"nomineeRelationship":"",
			"dateOfBirth":null,
		}
	},
	"medicalQuestionarrie":[
	 ],
	"socialStatusDetails":{
		"socialStatus":"",
		"unorganizedSector":"",
		"belowPovertyLine":"",
		"informalSector":"",
		"phyicallyChallenged":""
	},
	"previousPolicyDetails":{
		"policyNumber":"",
		"insurerName":"",
		"insurerRegisCode":""
	},
	"declartionDetails":[],
	"coverageDetails":{
		"carrierQuoteId":"",
		"policyStartDate":"",
		"policyEndDate":"",
		"policyTerm":0,
		"sumAssured":0,
		"basePremium":0,
		"serviceTax":0,
		"cessTax":0,
		"otherTax":0,
		"totalPremium":0,
		"riders":[
		
		]
	}
};
var healthDieaseDef={
		"dieaseCode":0,
		"dieaseName":"",
		"desc":"",
		"applicable":null,
		"startDate":"",
		"data":null
		};
var medicalDieaseDef={
		"questionCode":0,
		"dieaseName":"",
		"desc":"",
		"applicable":null,
		"startDate":"",
		"data":null
		};
var healthRiderPremiumDef={
		"riderId":0,
		"premiumAmount":0,
		"serviceTax":0,
		"cessTax":0,
		"otherTax":0,
		"totalPremium":0,
		"sumAssured":0
		};
var healthDeclartionDef={
		"declartionType":"",
		"declartionCode":"",
		"accepted":false,
		"description":""
	};
var insuredMemberDef={
		"salutation":"",
		"firstName":"",
		"middleName":"",
		"lastName":"",
		"dateOfBirth":null,
		"relationship":"",
		"gender":"",
		"height":"",
		"weight":0,
		"occupation":"",
		"preExistingDieases":"Y",
		"dieaseDetails":[
		],
		"carrierMedicalQuestion":[
		 ]
	};
var medicalQuestionDef={
		"questionCode":"",
		"question":"",
		"questionDesc":"",
		"applicable":null,
		"data":null
	};