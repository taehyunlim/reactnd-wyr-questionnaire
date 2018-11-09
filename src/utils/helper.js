export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return d.toLocaleDateString() + ' @' + time.substr(0, 5) + time.slice(-2)
}

export function formatQuestion (question, author, authedUser) {
  const { id, optionOne, optionTwo, timestamp } = question
  const { name, avatarURL } = author
  const { votes: votesOptionOne, text: textOptionOne } = optionOne
  const { votes: votesOptionTwo, text: textOptionTwo } = optionTwo

  return {
    name,
    id,
    timestamp: formatDate(timestamp),
    avatar: avatarURL,
    votesOptionOne,
    votesOptionTwo,
    textOptionOne,
    textOptionTwo
  }
}