---@param action string The action you with to target.
---@param data any The data you wish to send along with the action.
function SendSolidMessage(action, data)
  SendNUIMessage({
    action = action,
    data = data
  })
end