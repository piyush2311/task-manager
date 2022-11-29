module.exports = {
	dbOptions: {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		poolSize: 10,
		user:'yoosh',
		pass:'Z72m2e8*Sj&4DQCMC',
		keepAlive: true,
		keepAliveInitialDelay: 300000,
		//autoReconnect: true
	},
	smtp : {
		senderHost :'mail.yoosh.ai',
		senderPort :465,
		senderUsername :'alerts@yoosh.ai',
		senderPassword :'yooshdemo2020',
		senderFrom :'alerts@yoosh.ai',
	}
}
